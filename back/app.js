const express  = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const path =require("path");
const mongodb = require("./db/db");
const bodyParser = require("body-parser");
const routeUser = require("./route/user_route");
const routeSauce = require("./route/sauce_route");
const helmet = require("helmet");

//sucuriter http
app.use(helmet({
    crossOriginResourcePolicy: false,
  }))
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



app.use("/images/", express.static(path.join(__dirname, "images")))
app.use("/api/auth", routeUser)
app.use("/api/sauces", routeSauce)
module.exports = app;