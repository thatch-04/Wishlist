//grab environmental variables
require("dotenv").config();
//import mongoose
const mongoose = require("mongoose")
//import merved logger for colorful logs
const {log} = require("mercedlogger")
//grab database string
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/database"

/////////////////////////////////
//Mongoose Config Object
/////////////////////////////////

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}

/////////////////////////////////
//Making database connection
/////////////////////////////////

mongoose.connect(MONGODB_URL, config);

/////////////////////////////////
//Handling Connection Events
/////////////////////////////////

mongoose.connection
//event for when connection opens
.on("open", () => log.green("STATUS", "Connected to Mongo"))
//event for when connection closes
.on("close", () => log.red("STATUS", "Connetion closed"))
//event for errors
.on("error", error => log.red("ERROR", error))


/////////////////////////////////
//Export Connection
/////////////////////////////////

module.exports = mongoose;