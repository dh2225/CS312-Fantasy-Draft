import React, { Component } from 'react';

class TeamManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTeamId: null,
      selectedTeamPlayers: []
    }
  }

    // Sort the players based on their positions
    sortPlayersByPosition = (players) => {
      const positionOrder = {
        QB: 0,
        RB: 1,
        WR: 2,
        TE: 3,
        FLEX: 4,
        DEF: 5,
        PK: 6,
      }

      // uses the built-in sort function to sort our players in the specific order
      // speficied: QB, RB, WR, TE, FLEX, DEF, PK
      return players.sort((a, b) => positionOrder[a.position] - positionOrder[b.position])
    }

  // handler to set the selectedTeamId and
  // invoke our fetchTeam endpoint with the
  // selectedTeamId event state as the query parameter
  handleTeamSelect = (event) => {
    const selectedTeamId = event.target.value;
    this.setState({ selectedTeamId })
  
    const apiUrl = `http://localhost:1234/fetchTeam/?manager=${selectedTeamId}`
  
    fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
          draftedRound: player.draftedRound,
          manager: player.manager,
          status: player.status,
        }))
        this.setState({ selectedTeamPlayers })
      })
      .catch((error) => {
        console.error('Error fetching team data:', error);
        // Handle any errors that occurred during the fetch request
      })
  }
  

  // in the render() method we implement a select tag that allows the user to
  // interact with a drop down menu. When clicked, the menu invokes the
  // handleTeamSelect() function which invokes the handleNameChange() method that
  // is passed as a prop from App.js to TeamManagement.js. It then displays the
  // team is a nice grid table with the position, name, team, bye and round drafted
  // of each player with a manager field that matches the selected team id.
  render() {
    const { teams } = this.props
    const { selectedTeamId, selectedTeamPlayers } = this.state

    const sortedPlayers = this.sortPlayersByPosition(selectedTeamPlayers)
    

    return (
      <div>
        <h1>Team Viewer</h1>
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
            <div className="grid-column">Round Drafted</div>
          </div>
          <div className="grid-body">
            {sortedPlayers.map((player) => (
              <div key={player._id} className="grid-row">
                <div className="grid-column">{player.position}</div>
                <div className="grid-column">{player.name}</div>
                <div className="grid-column">{player.team}</div>
                <div className="grid-column">{player.bye}</div>
                <div className="grid-column">{player.adp}</div>
                <div className="grid-column">{player.draftedRound}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default TeamManagement
