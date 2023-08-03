import React, { Component } from 'react';

class AvailablePlayerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:1234/fetchPlayers/')
    .then((res) => res.json())
    .then((data) => {
      const players = data.map((player) => ({
        _id: player.id,
        adp: player.adp,
        name: player.name,
        position: player.position,
        team: player.team,
        bye: player.bye,
        manager: player.manager,
        status: player.status,
      }));
      this.setState({ players });
    })
  }

  render() {
    return (
      <div className="grid-container">
        <div className="grid-header">
          <div className="grid-column">ADP</div>
          <div className="grid-column">Player Name</div>
          <div className="grid-column">Position</div>
          <div className="grid-column">Team</div>
          <div className="grid-column">Bye Week</div>
          <div className="grid-column"></div>
        </div>
        <div className="grid-body">
          {this.state.players.map((player) => (
            <div className="grid-row">
              <div className="grid-column">{player.adp}</div>
              <div className="grid-column">{player.name}</div>
              <div className="grid-column">{player.position}</div>
              <div className="grid-column">{player.team}</div>
              <div className="grid-column">{player.bye}</div>
              <div className="grid-column">
                <button>Add Player</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AvailablePlayerList;