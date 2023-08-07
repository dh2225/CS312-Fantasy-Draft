//all services related to players

import { PlayerModel } from "../Models/PlayerModel.js";

const addPlayer = async (adp, name, position, team, bye) => {
    let playerDoc = new PlayerModel({
        adp: adp,
        name: name,
        position: position,
        team: team,
        bye: bye,
        manager: null,
        status: true,
    });
    const result = await playerDoc.save();
    return result;
};

const fetchPlayers = async () => {
    const availablePlayers = await PlayerModel.find({status: true});
    console.log("Players:", availablePlayers)
    return availablePlayers;
};

const fetchTeam = async (manager) => {
    const team = await PlayerModel.find({manager: manager});
    console.log("Selected Team:", team)
    return team;
};

const findPlayerById = async (id) => {
    const player = await PlayerModel.findById(id);
    return player;
}

const updatePlayer = async (id, manager, draftedRound) => {
    const player = await PlayerModel.findById(id);
    player.manager = manager;
    player.status = false;
    player.draftedRound = draftedRound;
    await player.save();
    return player;
};

const deletePlayer = async (id) => {
    const player = await PlayerModel.findByIdAndDelete(id);
    return player;
};

const resetPlayers = async () => {
    const freshPlayerList = await PlayerModel.updateMany({}, {$set: {manager: null, status: true}})
    return freshPlayerList;
}



export { addPlayer, fetchPlayers, fetchTeam, findPlayerById, updatePlayer, deletePlayer, resetPlayers };
