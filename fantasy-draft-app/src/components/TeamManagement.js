import React, { Component } from 'react';

class TeamManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTeamId: null,
    }
  }

  // handler to set the selectedTeamId
  handleTeamSelect = (event) => {
    const selectedTeamId = event.target.value
    this.setState({ selectedTeamId })
  }

  
  render() {
    const { teams } = this.props
    const { selectedTeamId } = this.state

    const selectedTeam = teams.find((team) => team.id === parseInt(selectedTeamId, 10))

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
        {selectedTeam && (
          <div>
            <h2>{selectedTeam.name}</h2>
            <h4>Players:</h4>
            <ul className="teamManagementPlayerList">
                <li>QB: {selectedTeam.players.QB}</li>
                <li>RB1: {selectedTeam.players.RB1}</li>
                <li>RB2: {selectedTeam.players.RB2}</li>
                <li>WR1: {selectedTeam.players.WR1}</li>
                <li>WR2: {selectedTeam.players.WR2}</li>
                <li>TE: {selectedTeam.players.TE}</li>
                <li>FLEX1: {selectedTeam.players.FLEX1}</li>
                <li>FLEX2: {selectedTeam.players.FLEX2}</li>
                <li>DST: {selectedTeam.players.DST}</li>
                <li>K: {selectedTeam.players.K}</li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamManagement
