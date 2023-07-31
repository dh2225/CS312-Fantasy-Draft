import mongoose from "mongoose";

const serverName = "127.0.0.1";

const databaseName = "Fantasy_Draft"

const URL = `mongodb://${serverName}:27017/${databaseName}`;

class Database{
    constructor(){
        this._connect();
    }

    _connect(){
        mongoose.connect(URL)
            .then(()=>console.log("database connection established"))
            .catch(err=>console.log("error occured", err))
    }
}

export default new Database();