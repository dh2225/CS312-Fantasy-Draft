//all services related to players

import { PlayerModel } from "../Models/PlayerModel.js";

// addPlayer service function that accepts adp, name, position, team
// and bye as parameters and creates a new PlayerModel object
// with the parameter data and subsequently saves the newly added player
const addPlayer = async (adp, name, position, team, bye) => {
    let playerDoc = new PlayerModel({
        adp: adp,
        name: name,
        position: position,
        team: team,
        bye: bye,
        manager: null,
        status: true,
    })
    const result = await playerDoc.save()
    return result
};

// This is our fetchPlayers service function that is invoked
// by the fetchPlayersEndpoint() function. It uses the mongoDB
// find() method to find all players with a status of true. 
// The only time a player status is not true is after the player
// has been successfully added to a Fantasy Team, therefore this
// should only show available players!
const fetchPlayers = async () => {
    const availablePlayers = await PlayerModel.find({status: true})
    return availablePlayers
}

// This is our fetchTeam() service function that is invoked by
// the fetchTeamEndpoint() function. It uses the mongoDB
// find() method to find all players with a specfic manager id. 
const fetchTeam = async (manager) => {
    const team = await PlayerModel.find({manager: manager})
    return team
}

// this is a helper function that finds a specific player
// by their specific id
const findPlayerById = async (id) => {
    const player = await PlayerModel.findById(id)
    return player
}

// this is our updatePlayers() service function that is 
// invoked by the updatePlayerEndpoint() function. It accepts
// three parameters and finds the correct player in our mongoDB
// using findById(). It then sets the fields to the parameters
// and saves the player.
const updatePlayer = async (id, manager, draftedRound) => {
    const player = await PlayerModel.findById(id)
    player.manager = manager
    player.status = false
    player.draftedRound = draftedRound
    await player.save()
    return player
};

// this is our deletePlayer() service function that is 
// invoked by the deletePlayerEndpoint() function. It accepts
// one parameter and finds the correct player to delete
// in our mongoDB using the built in findByIdAndDelete method.
const deletePlayer = async (id) => {
    const player = await PlayerModel.findByIdAndDelete(id)
    return player
}

// This is our resetPlayers() service function that is invoked
// by the resetPlayersEndpoint() function. It takes no parameters
// and simply sets all the player manager fields to null and all
// the status fields to true. This is invoked when the user wants
// to completely reset the draft and erase any progress made.
const resetPlayers = async () => {
    const freshPlayerList = await PlayerModel.updateMany({}, {$set: {manager: null, status: true}})
    return freshPlayerList
}

export { addPlayer, fetchPlayers, fetchTeam, findPlayerById, updatePlayer, deletePlayer, resetPlayers }
