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
      };
  
      return players.sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);
    };

  // handler to set the selectedTeamId
  handleTeamSelect = (event) => {
    const selectedTeamId = event.target.value;
    this.setState({ selectedTeamId });
  
    const apiUrl = `http://localhost:1234/fetchTeam/?manager=${selectedTeamId}`;
  
    fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response Data:', data); // Log the raw data received from the API
  
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
        }));
        console.log('Selected Team Players:', selectedTeamPlayers); // Log the selectedTeamPlayers array
        this.setState({ selectedTeamPlayers });
      })
      .catch((error) => {
        console.error('Error fetching team data:', error);
        // Handle any errors that occurred during the fetch request
      });
  };
  

  render() {
    const { teams } = this.props
    const { selectedTeamId, selectedTeamPlayers } = this.state

    const sortedPlayers = this.sortPlayersByPosition(selectedTeamPlayers);
    

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
