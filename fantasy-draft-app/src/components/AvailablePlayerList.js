import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const AvailablePlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
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
        }));
        setPlayers(playersData);
      });
  }, []);

  const handleAddPlayerToTeam = (playerId) => {
    const apiUrl = 'http://localhost:1234/updatePlayer'; // Replace with your API endpoint URL

    const requestData = {
      id: playerId, // playerId as id in the body
      manager: "Team 1", // Setting the manager to "Team 1"
    };

    fetch(apiUrl, {
      method: 'PUT', // Using PUT method to update the player
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(requestData), // Send the requestData as JSON in the request body
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
        }));
        setPlayers(playersData);
      });
    })
  };

  const columns = [
    {
      name: 'ADP',
      selector: 'adp',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Position',
      selector: 'position',
      sortable: true,
    },
    {
      name: 'Team',
      selector: 'team',
      sortable: true,
    },
    {
      name: 'Bye',
      selector: 'bye',
      sortable: true,
    },
    {
      name: 'Add to Team',
      cell: (row) => (
        <button onClick={() => handleAddPlayerToTeam(row._id)}>
          Add Player
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // this function uses MongoDB's filter() function to implement our search bar
  const filteredPlayers = players.filter((player) => {
    const searchTextLowerCase = searchText.toLowerCase();
    // Can come back and add more fields to search through later
    const fieldsToSearch = ['name', 'team', 'position']; 
  
    // Check if any of the fields match the search text
    return fieldsToSearch.some((field) =>
      player[field].toLowerCase().includes(searchTextLowerCase)
    );
  });
  

  return (
    <div className="grid-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name, position, team..."
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredPlayers}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 25, 50]}
        highlightOnHover
        responsive
        striped
        theme='dark'
      />
    </div>
  );
};

export default AvailablePlayerList;
