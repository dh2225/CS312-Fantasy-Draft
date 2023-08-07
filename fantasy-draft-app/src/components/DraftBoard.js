import React, { Component } from 'react'

// this function is responsible for randomly
// generating an ASCII color code to be used
// for styling purposes
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class DraftBoard extends Component {

  // The only state being managed in the DraftBoard.js file now
  // is the individual team colors that are randomly generated once per team id.
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

  // this function is responsible for handling the click event that happens
  // when a user clicks the teamName header that is rendered below.
  // This invokes the handleNameChange() method that we passed as a prop
  // from App.js. 
  handleTeamNameClick = (teamId) => {
    const newName = prompt("Enter new team name:");
    if (newName !== null) {
    this.props.handleNameChange(teamId, newName)
    }

  }

  // This function invokes our resetPlayers endpoint
  // which is a PUT method that alters the status and manager
  // fields of every player in our mongoDB.
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
    // force a reload webpage on button press
    window.location.reload()
  }

  render() {
    // destructure
    const { pickingId, teams, countdown, roundNum, draftStarted, isEndOfDraft } = this.props
    const { teamColors } = this.state

    // Here we render our two buttons at the top of the web page. This includes some logic
    // that checks our draftStarted flag and our isEndOfDraft flag to display the countdown
    // when the draft is in progress, and a custom "Draft is over!" message when the
    // isEndOfDraft flag evaluates to true.
    
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
            {
              // We have a div called teamsGrid that is a container for all the "team" divs. It uses 
              // grid styling to show all 10 teams horizontally next to one another.
              // It includes conditionals in in-line div styling that matches a team.id with the
              // pickingId state variable passed as a prop from App.js. It then makes the team that
              // is currently drafting have a thicker bright-red border. Otherwise, it implements our
              // teamColors state which we initialized at the beginning of the component to change
              // the team borders to give them each an individual color.
              //
              // Below that, our teanName div is responsible for invoking the handleTeamNameClick()
              // handler function ON HEADER CLICK. This opens a prompt for the user to change their
              // team name. It then properly renders all 10 team divs with their 10 players.
            teams.map((team) => (
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