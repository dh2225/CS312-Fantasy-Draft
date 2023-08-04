import React, { Component } from 'react'

class DraftBoard extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         draftStarted: false,
         countdown: 0,
         teams: Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: `Team ${i + 1}`,
            players: {
              QB: null,
              RB1: null,
              RB2: null,
              WR1: null,
              WR2: null,
              TE: null,
              FLEX1: null,
              FLEX2: null,
              DST: null,
              K: null,
            },
          })),
         pickingId: 0,
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
        this.interval = setInterval(this.updateCountdown, 1000)
    }

    updateCountdown = () => {
        this.setState((prevState) => ({
            countdown: prevState.countdown - 1,
          }))
    }

    updatePickingId = () => {
        const { pickingId } = this.state

        if (pickingId === 10) {
            this.setState((prevState) => ({
                pickingId: 1,
              }))
        } else {
            this.setState((prevState) => ({
                pickingId: prevState.pickingId + 1,
              }))
        }
    }

    // function responsible for checking to see if all teams are filled,
    // if they are, we know to stop the timer and end the draft
    checkIfAllTeamsFilled = () => {
        const { teams } = this.state
        // check to see if all teams have 10 players 
        // (1QB, 2RB, 2WR, 1TE, 2FLEX, 1DST, 1Kick)
        return teams.every((team) => team.players.length === 10)
    }

    componentDidUpdate() {
        const { draftStarted, countdown } = this.state
    
        if (draftStarted && countdown === 0) {
            
            this.updatePickingId()
            this.setState({ countdown: 60 });
            
            if (this.checkIfAllTeamsFilled()) {
                // Stop the countdown and show a message
                this.setState({ countdown: 9999 });
                console.alert('All teams are filled!');
            }
        }
      }
    
      handleStartDraft = () => {
        this.startDraft();
      };

      handleTeamNameClick = () => {
        const newName = prompt("Enter new team name:");
        if (newName !== null) {
          this.setState({ teams: newName });
        }
      };
    
      render() {
        const { draftStarted, teams, pickingId, countdown } = this.state;
    
        return (
          <div>
            {!draftStarted && <button className="startDraftButton" onClick={this.handleStartDraft}>Start Draft</button>}
            
            {draftStarted && <div className="countdownDiv">Team {pickingId} is drafting: {countdown} seconds</div>}

            <div className="teamsGrid">
                {teams.map((team) => (
                    <div key={team.id} className="team">
                        <h4 className="teamName" onClick={this.handleTeamNameClick}>{team.name}</h4>
                        <ul className="playerList">
                            <li>QB: {team.players.QB || 'Placeholder'}</li>
                            <li>RB1: {team.players.RB1 || 'Placeholder'}</li>
                            <li>RB2: {team.players.RB2 || 'Placeholder'}</li>
                            <li>WR1: {team.players.WR1 || 'Placeholder'}</li>
                            <li>WR2: {team.players.WR2 || 'Placeholder'}</li>
                            <li>TE: {team.players.TE || 'Placeholder'}</li>
                            <li>FLEX1: {team.players.FLEX1 || 'Placeholder'}</li>
                            <li>FLEX2: {team.players.FLEX2 || 'Placeholder'}</li>
                            <li>DST: {team.players.DST || 'Placeholder'}</li>
                            <li>K: {team.players.K || 'Placeholder'}</li>
                        </ul>
                    </div>
                ))}
            </div>
          </div>
        );
      }
}

export default DraftBoard