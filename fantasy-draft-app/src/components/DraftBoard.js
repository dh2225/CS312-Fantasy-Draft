import React, { Component } from 'react'

class DraftBoard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       draftStarted: false
    }
  }
    componentDidMount() {
        this.interval = null
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    // startDraft function is responsible for starting the draft timer
    // and keeping the timer running appropriately
    startDraft = () => {
        this.setState({ draftStarted: true })
        this.interval = setInterval(this.props.updateCountdown, 1000)
    }

    // function responsible for checking to see if all teams are filled,
    // if they are, we know to stop the timer and end the draft
    checkIfAllTeamsFilled = () => {
      const { teams } = this.props;
    
      // Check if all teams have been filled
      for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
    
        for (let j = 0; j < team.players.length; j++) {
          if (team.players[j] === null) {
            // If any player is null, the team is not full
            return false;
          }
        }
      }
      // All teams are filled if we reached this point
      return true;
    };
    
    
    componentDidUpdate(prevProps) {
      const { countdown, roundNum, pickingId, draftStarted } = this.props;
    
      // Check if it's round 10, pickingId is 1, all teams are filled, and draftStarted has changed from false to true
      if (
        roundNum === 10 &&
        pickingId === 1 &&
        this.checkIfAllTeamsFilled() &&
        draftStarted
      ) {
        // Stop the countdown and show a message
        this.props.resetCountdown(0); // Set countdown to 0 to stop it
        alert('All teams are filled! The draft is over.');
      } else if (draftStarted && countdown === 0) {
        this.props.updatePickingId();
        this.props.resetCountdown(20);
      }
    }
    
      handleStartDraft = () => {
        this.startDraft()
      };

      // handleTeamNameClick = () => {
      //   const newName = prompt("Enter new team name:");
      //   if (newName !== null) {
      //     this.setState({ teams: newName });
      //   }
      // }

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
        const { pickingId, teams, countdown, roundNum } = this.props
        const { draftStarted } = this.state
    
        return (
          <div>
            <div className="buttonWrapper">
              {!draftStarted && (
                <button className="startDraftButton" onClick={this.handleStartDraft}>
                Start Draft
                </button>
              )}

              <button className="resetDraftButton" onClick={this.handleResetDraft}>
              Reset Draft
              </button>
            </div>
            
            {draftStarted && <div className="countdownDiv">Round {roundNum} - Team {pickingId} is drafting: {countdown} seconds</div>}

            <div className="teamsGrid">
                {teams.map((team) => (
                    <div key={team.id} className="team" 
                    style={{
                      border: `3px solid ${draftStarted && team.id === pickingId ? 'red' : 'black'}`,
                      padding: '3px',
                      margin: '1px',
                    }}>
                        <h4 className="teamName" /*</div>onClick={this.handleTeamNameClick}*/>{team.name}</h4>
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