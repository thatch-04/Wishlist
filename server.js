//grab env variables
require("dotenv").config;
//import express
const express = require("express");
// IMPORT DATABASE CONNECTION
const mongoose = require("./db/connection")
// IMPORT MERCED LOGGER
const { log } = require("mercedlogger")
//IMPORT MIDDLEWARE
const methodOverride = require("method-override")
const morgan = require("morgan")
const cors = require("cors")
// GET PORT FROM ENV OR DEFAULT PORT
const PORT = process.env.PORT || "2021"

//////////////////////////////
//Create app object
//////////////////////////////

const app = express();

//////////////////////////////
//Set View Engine
//////////////////////////////

app.set("view engine", "ejs");

//////////////////////////////
//Set up middleware
//////////////////////////////

app.use(cors()) //prevent cors errors
app.use(methodOverride("_method"))  //swap methods
app.use(express.static("public"))  //serve public folder as static
app.use(morgan("tiny")) //Request Logging
app.use(express.json()) //Parse json bodies
app.use(express.urlencoded({extended: false})) //parse bodies from submissions

//////////////////////////////
//Routes and Routers
//////////////////////////////

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

//////////////////////////////
//App Listener
//////////////////////////////

app.listen(PORT, () => log.white("🚀 Server Launch 🚀", `Listening on Port ${PORT}`)) 