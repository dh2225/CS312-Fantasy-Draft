import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'

const AvailablePlayerList = ({ pickingId, teams, draftStarted, roundNum, updatePickingId, resetCountdown }) => {
  // hooks
  const [players, setPlayers] = useState([])
  const [searchText, setSearchText] = useState('')

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
          draftedRound: player.draftedRound,
          manager: player.manager,
          status: player.status,
        }))
        setPlayers(playersData)
      })
  }, [])

  // responsible for handling when the user clicks the "Add Player" button
  const handleAddPlayerToTeam = (playerId, playerPosition, playerName) => {

    // Don't allow the user to add players to a team without the draft timer commencing
    if (!draftStarted) {
      return
    }
  
    // check to make sure the current picking team has slots available for that position
    for (let i=0; i < teams.length; i++) {
      const team = teams[i]

      if (team.id === pickingId) {
        // check if the player position being added is full or not
        
        // check QB first, place the player in flex spots if the QB spot is full
        if (playerPosition === "QB") {
          if (team.players.QB === null) {
            team.players.QB = playerName
          } else {
            if (team.players.FLEX1 === null) {
              team.players.FLEX1 = playerName
            } else {
              if (team.players.FLEX2 === null) {
                team.players.FLEX2 = playerName
              } else {
                alert("The position you are trying to fill is full.")
                return
              }
            }
          }
        } else if (playerPosition === "TE") {
          // Check if TE slot is full, if so, check flex spots
          if (team.players.TE === null) {
            team.players.TE = playerName
          } else {
            if (team.players.FLEX1 === null) {
              team.players.FLEX1 = playerName
            } else {
              if (team.players.FLEX2 === null) {
                team.players.FLEX2 = playerName
              } else {
                alert("The position you are trying to fill is full.")
                return
                }  
              } 
            }
        } else if (playerPosition === "DEF") {
          // Check if DST slot is full, if so, check flex spots
          if (team.players.DST === null) {
            team.players.DST = playerName
          } else {
            if (team.players.FLEX1 === null) {
              team.players.FLEX1 = playerName
            } else {
              if (team.players.FLEX2 === null) {
                team.players.FLEX2 = playerName
              } else {
                alert("The position you are trying to fill is full.")
                return
                }  
              } 
            }
        } else if (playerPosition === "PK") {
          // Check if K slot is full, if so, check flex spots
          if (team.players.K === null) {
            team.players.K = playerName
          } else {
            if (team.players.FLEX1 === null) {
              team.players.FLEX1 = playerName
            } else {
              if (team.players.FLEX2 === null) {
                team.players.FLEX2 = playerName
              } else {
                alert("The position you are trying to fill is full.")
                return
                }  
              } 
            }
        } else if (playerPosition === "RB") {
          // Check if RB slots are full, if so, check flex spots
          if (team.players.RB1 === null) {
            team.players.RB1 = playerName
          } else if (team.players.RB1 != null) {
            if (team.players.RB2 === null) {
              team.players.RB2 = playerName
            } else {
              // check flex spots
              if (team.players.FLEX1 === null) {
                team.players.FLEX1 = playerName
              } else {
                if (team.players.FLEX2 === null) {
                  team.players.FLEX2 = playerName
                } else {
                  alert("The position you are trying to fill is full.")
                  return
                  }
              }
            }
          } 
        } else if (playerPosition === "WR") {
          // Check if WR slots are full, if so, check flex spots
          if (team.players.WR1 === null) {
            team.players.WR1 = playerName
          } else if (team.players.WR1 != null) {
            if (team.players.WR2 === null) {
              team.players.WR2 = playerName
            } else {
              // check flex spots
              if (team.players.FLEX1 === null) {
                team.players.FLEX1 = playerName
              } else {
                if (team.players.FLEX2 === null) {
                  team.players.FLEX2 = playerName
                } else {
                  alert("The position you are trying to fill is full.")
                  return
                  }
              }
            }
          }
        }

        // now that we have updated the teams state array, lets make the change in the DB
        // here we invoke our updatePlayer endpoint.
        const apiUrl = 'http://localhost:1234/updatePlayer' 

        const requestData = {
          id: playerId, // playerId as id in the body
          manager: pickingId, // Setting the manager to pickingId prop passed from App.js
          draftedRound: roundNum,
        }

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
              draftedRound: player.draftedRound, 
              manager: player.manager,
              status: player.status,
            }))
            setPlayers(playersData)
          })
        })
        // make sure to update the pickingId to reflect the fact that a user has selected a player
        // and their draft turn is over. Reset the countdown state as well.
        resetCountdown(60)
        updatePickingId()
      }
    }
  }
  
  // define columns to be used by react-data-table-component
  // includes a custom cell that has our "Add Player" button!
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
        <button onClick={() => handleAddPlayerToTeam(row._id, row.position, row.name)}>
          Add Player
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  // this function uses MongoDB's filter() function to implement our search bar
  const filteredPlayers = players.filter((player) => {
    const searchTextLowerCase = searchText.toLowerCase()
    // Can come back and add more fields to search through later
    const fieldsToSearch = ['name', 'team', 'position']
  
    // Check if any of the fields match the search text
    return fieldsToSearch.some((field) =>
      player[field].toLowerCase().includes(searchTextLowerCase)
    )
  })

  // invoke the DataTable custom tag we imported at the top of this component
  // and pass the appropriate data to it. Also include the table
  // options such as pagination, highligh on hover, striping and theme.
  return (
    <div className="avail-player-grid-container">
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
  )
}

export default AvailablePlayerList
