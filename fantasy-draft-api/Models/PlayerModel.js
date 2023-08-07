import mongoose from "mongoose";

const PlayerSchema = mongoose.Schema({
    adp: {
        type: Number,
    },
    name: {
        type: String,
    },
    position: {
        type: String,
    },
    team: {
        type: String, 
    },
    bye: {
        type: Number,
    },
    draftedRound: {
        type: Number,
    },
    manager: {
        type: String,
    },
    status: {
        type: Boolean,
    }
});

const PlayerModel = mongoose.model("players", PlayerSchema)

export { PlayerModel };