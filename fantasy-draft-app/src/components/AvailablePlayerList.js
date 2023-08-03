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
      <div>
        
      </div>
    );
  }
}

export default AvailablePlayerList;