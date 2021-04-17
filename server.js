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
const SECRET = process.env.SECRET || "secret"
const HomeRouter = require("./routes/home.js");
// Sessions Middleware
const session = require("express-session"); // create session cookies
const connect = require("connect-mongodb-session")(session) // store cookies in mongo

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
// SESSION MIDDLEWARE REGISTRATION (adds req.session property)
app.use(
    session({
      secret: SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
      saveUninitialized: true, // create session regardless of changes
      resave: true, //save regardless of changes
      store: new connect({
        uri: process.env.MONGODB_URL,
        databaseName: "sessions",
        collection: "sessions",
      }),
    })
  );

//////////////////////////////
//Routes and Routers
//////////////////////////////

app.use("/", HomeRouter);

//////////////////////////////
//App Listener
//////////////////////////////

app.listen(PORT, () => log.white("🚀 Server Launch 🚀", `Listening on Port ${PORT}`)) 