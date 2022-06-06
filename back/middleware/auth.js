const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


module.exports = (req,res,next)=>{
    try{
        //recuperer le TOKEN dans le headers authorization (bearer)
        const token = req.headers.authorization.split(" ")[1];
        // console.log("*****************TOKEN******************");
        // console.log(token);
        //decode TOKEN
        const decoded = jwt.verify(token, process.env.KEY_TOKEN)
        // console.log("*****************DECODED******************");
        // console.log(decoded);
        //recuperer le userId a linterieur du token
        const userIdDecoded = decoded.userId;
        // console.log(userIdDecoded);
        // console.log("************REQ.BODY.SAUCE.USERID************");
        // console.log(req.body.userId);

        //comparaison userId
        
        //si cest bon pass au middleware suivant
        if(req.body.userId && req.body.userId !== userId){
            throw "UserId non valable"
        }else{
            next()
        }
    }catch (err){
        res.status(400).json({err})
    }
}