import React, { Component } from 'react'

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class DraftBoard extends Component {

  constructor(props) {
    super(props)

    const teamColors = {};
    // Generate random colors for each team and store them in the state
    props.teams.forEach((team) => {
      teamColors[team.id] = getRandomColor();
    });
  
    this.state = {
       teamColors,
    }
  }
    handleTeamNameClick = (teamId) => {
      let {draftStarted} = this.props
      
      if (draftStarted) {
        const newName = prompt("Enter new team name:");
        if (newName !== null) {
        this.props.handleNameChange(teamId, newName)
        }
      }
  }

  handleResetDraft = () => {
    const apiUrl = 'http://localhost:1234/resetPlayers' 

    fetch(apiUrl, {
      method: 'PUT', // Using PUT method to update the players
      headers: {'Content-Type': 'application/json',}
    })
    .then(res=>res.json())
    .then(json => {
      console.log(json);
      fetch('http://localhost:1234/fetchPlayers/')
      .then((res) => res.json())
      .then((data) => {
        const playersData = data.map((player) => ({
          _id: player._id,
          adp: player.adp,
          name: player.name,
          position: player.position,
          team: player.team,
          bye: player.bye,
          manager: player.manager,
          status: player.status,
        }))
        this.setState({players: playersData})
      })
    })
    // reload webpage on button press
    window.location.reload()
  }

  render() {
    const { pickingId, teams, countdown, roundNum, draftStarted, isEndOfDraft } = this.props
    const { teamColors } = this.state

    return (
      <div>
        <div className="buttonWrapper">
          {!draftStarted && !isEndOfDraft && (
            <button className="startDraftButton" onClick={this.props.handleStartDraft}>
            Start Draft
            </button>
          )}

          <button className="resetDraftButton" onClick={this.handleResetDraft}>
          Reset Draft
          </button>
        </div>
        
        {draftStarted && !isEndOfDraft && <div className="countdownDiv">Round {roundNum} - Team {pickingId} is drafting: {countdown} seconds</div>}
        {isEndOfDraft && <div><h2>Draft is over!</h2></div>}

        <div className="teamsGrid">
            {teams.map((team) => (
                <div
                key={team.id}
                className="team"
                style={{
                  border: `3px solid ${
                    draftStarted && !isEndOfDraft && team.id === pickingId ? 'red' : teamColors[team.id]
                  }`,
                  // Add an extra border width when the team is currently drafting
                  borderWidth: draftStarted && !isEndOfDraft && team.id === pickingId ? '7px' : '3px',
                  padding: '3px',
                  margin: '1px',
                }}
              >
                    <h4 className="teamName" onClick={() => this.handleTeamNameClick(team.id)}>{team.name}</h4>
                    <ul className="playerList">
                        <li>QB: {team.players.QB}</li>
                        <li>RB1: {team.players.RB1}</li>
                        <li>RB2: {team.players.RB2}</li>
                        <li>WR1: {team.players.WR1}</li>
                        <li>WR2: {team.players.WR2}</li>
                        <li>TE: {team.players.TE}</li>
                        <li>FLEX1: {team.players.FLEX1}</li>
                        <li>FLEX2: {team.players.FLEX2}</li>
                        <li>DST: {team.players.DST}</li>
                        <li>K: {team.players.K}</li>
                    </ul>
                </div>
            ))}
        </div>
      </div>
    )
  }
}

export default DraftBoard