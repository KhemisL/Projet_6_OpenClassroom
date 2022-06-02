const express  = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const mongodb = require("./db/db");
const bodyParser = require("body-parser");
const routeUser = require("./route/user_route")


app.use(bodyParser.json())
// logger les request et response
app.use(morgan("dev"))
//CORS
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
})




app.use("/api/auth", routeUser)
module.exports = app;