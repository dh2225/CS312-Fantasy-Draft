import React, { Component } from 'react';

class TeamManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTeamId: null,
      selectedTeamPlayers: []
    }
  }

  // handler to set the selectedTeamId
  handleTeamSelect = (event) => {
    const selectedTeamId = event.target.value
    this.setState({ selectedTeamId })

    const apiUrl = 'http://localhost:1234/fetchTeam' 
    
    const requestData = {
        manager: selectedTeamId, // Setting the manager to pickingId prop passed from App.js
      }
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(requestData),
    })
    .then((res) => res.json())
    .then((data) => {
      const selectedTeamPlayers = data.map((player) => ({
        _id: player.id,
        adp: player.adp,
        name: player.name,
        position: player.position,
        team: player.team,
        bye: player.bye,
        manager: player.manager,
        status: player.status,
      }));
      this.setState({ selectedTeamPlayers });
    })
  }

  render() {
    const { teams } = this.props
    const { selectedTeamId, selectedTeamPlayers } = this.state
    

    return (
      <div>
        <h1>Team Management</h1>
        <div>
          <label>Select Team: </label>
          <select onChange={this.handleTeamSelect} value={selectedTeamId}>
            <option value={null}>Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid-container">
            <div className="grid-header">
            <div className="grid-column">Position</div>
            <div className="grid-column">Player Name</div>
            <div className="grid-column">Team</div>
            <div className="grid-column">Bye Week</div>
            <div className="grid-column">ADP</div>
            </div>
            <div className="grid-body">
            {selectedTeamPlayers.map((player) => (
              <div key={player._id} className="player-row">
                <div className="grid-column">{player.position}</div>
                <div className="grid-column">{player.name}</div>
                <div className="grid-column">{player.team}</div>
                <div className="grid-column">{player.bye}</div>
                <div className="grid-column">{player.adp}</div>
                <div className="grid-column">
                  <button>Add Player</button>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
    )
  }
}

export default TeamManagement
