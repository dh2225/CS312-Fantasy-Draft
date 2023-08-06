import React, { Component } from 'react'

class DraftBoard extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         draftStarted: false,
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
        let { teams } = this.props
        // check to see if all teams have 10 players 
        // (1QB, 2RB, 2WR, 1TE, 2FLEX, 1DST, 1Kick)
        return teams.every((team) => team.players.length === 10)
    }

    componentDidUpdate() {
      let { countdown } = this.props
        const { draftStarted } = this.state
    
        if (draftStarted && countdown === 0) {
            
            this.props.updatePickingId()
            this.props.resetCountdown(20)
            
            if (this.checkIfAllTeamsFilled()) {
                // Stop the countdown and show a message
                this.props.resetCountdown(9999)
                console.alert('All teams are filled!')
            }
        }
      }
    
      handleStartDraft = () => {
        this.startDraft();
      };

      handleTeamNameClick = () => {
        let {teams} = this.props
        const newName = prompt("Enter new team name:");
        if (newName !== null) {
          this.setState({ teams: newName });
        }
      };
    
      render() {
        const { pickingId, teams, countdown } = this.props
        const { draftStarted } = this.state
    
        return (
          <div>
            {!draftStarted && <button className="startDraftButton" onClick={this.handleStartDraft}>Start Draft</button>}
            
            {draftStarted && <div className="countdownDiv">Team {pickingId} is drafting: {countdown} seconds</div>}

            <div className="teamsGrid">
                {teams.map((team) => (
                    <div key={team.id} className="team">
                        <h4 className="teamName" onClick={this.handleTeamNameClick}>{team.name}</h4>
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
        );
      }
}

export default DraftBoard