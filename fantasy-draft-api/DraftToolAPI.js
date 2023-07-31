import express from "express"; 
import "./connect.js";
import { addPlayer, fetchPlayers, findPlayerById, updatePlayer, deletePlayer } from "./services/DraftToolService.js";

const app = express(); 

app.use(express.json());

//C - addPlayerEndpoint
//API method: POST
//type of request data: body
    //{"adp":"adp of player", "name":"name of player", "position":"position of player", "team": "team of player", "bye":"bye week of player"}
//try:
    //check for required values
        //throw status code 400 error message "Missing required fields"
    //status code: 201
    //message: "Player added successfully"
//catch
    //status code: 500
    //error: "Error adding player to DB"
async function addPlayerEndpoint(request,response){
    try {
        const { adp, name, position, team, bye } = request.body;
    
        if (adp === undefined || name === undefined || position === undefined || team === undefined || bye === undefined) {
            return response
                .status(400)
                .send({ error: "Missing required fields" })
        }

        let player = await addPlayer(adp, name, position, team, bye);
        response    
            .status(201)
            .send({message: "Player added successfully", player})
    }

    catch(error){
        response
            .status(500)
            .send({error: "Error adding player to DB"})
    }
};

app.post('/addPlayer', addPlayerEndpoint);

//R - fetchPlayersEndpoint
//API method: GET
//try
    //status code: 200
    //data: [{},{},.....]
//catch
    //status code: 500
    //error: "Error getting players from DB"
async function fetchPlayersEndpoint(request,response){
    try{
        const players = await fetchPlayers();
        response
            .status(200)
            .send({message: "Player list fetched successfully", players})
    }

    catch(error){
        response    
            .status(500)
            .send({error: "Error getting players from DB"})
    }
};

app.get('/fetchPlayers', fetchPlayersEndpoint);

//U - updatePlayerEndpoint
//API method: PUT
//try 
    //status code: 200
    //message: "Player updated successfully"
//catch
    //status code: 500
    //error: "Error updating player from DB"
async function updatePlayerEndpoint(request,response){
    try{
        const { id, manager } = request.body;
        const exist = await findPlayerById(id);
        if (!exist) {
            response
                .status(404)
                .send({error: "Player ID does not exist"})
        }
    
        const player = await updatePlayer(id, manager);
        response
            .status(200)
            .send({message: "Player updated successfully", player})
    }
        
    catch(error){
        response
            .status(500)
            .send({error: "Error updating player from DB"})
    }

};
app.put('/updatePlayer', updatePlayerEndpoint);

//D - deletePlayerEndpoint
//API method: DELETE
//type of request data: body
   // {"id":""}
//try:
    //status code: 200
    //message: "Product successfully deleted"
//catch: 
    //status code: 200
    //error: "Failed to delete product"
async function deletePlayerEndpoint(request, response){
    try {
        const { id } = request.body;
        const exist = await findPlayerById(id);
        if (!exist) {
            response
                .status(404)
                .send({error: "Player ID does not exist"})
        }
        const player = await deletePlayer(id);
        response
            .status(200)
            .send({message: "Player successfully deleted", player});
    }

    catch (error){
        response
            .status(500)
            .send({error: "Error deleting player from DB"});
    }
};

app.delete("/deletePlayer", deletePlayerEndpoint);

//sets variable PORT to the port number we are using, 1234
let PORT = 1234;

//opens the PORT and listening for requests - logs this information
//uses function() callback function that will execute once the server starts listening on the specified PORT.
app.listen(PORT, function(){
    console.log("Listening at port:", PORT);
})
