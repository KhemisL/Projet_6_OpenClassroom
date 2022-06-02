const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@apisauce.vqsyrup.mongodb.net/${process.env.DB_NAME_API}?retryWrites=true&w=majority`)
.then(()=> console.log("Connect MongoDB succes"))
.catch(()=>console.log("Connect MongoDB loose"))

module.exports = mongoose