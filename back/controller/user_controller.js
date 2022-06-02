const User = require("../model/user_model");
const bcrypt = require("bcrypt");
const cryptoJs = require("crypto-js");
exports.signup = (req,res, next)=>{


    //crypter l'email
    const emailCrypto = cryptoJs.HmacSHA1(req.body.email, `process.env.SECRET_EMAIL`).toString();

    //crypter password et créer nouvelle utilisateur
    bcrypt.hash(req.body.password, 10)
        .then((hash)=>{
            const user = new User({
                email: emailCrypto,
                password: hash
            })

            user.save()
                .then(()=> res.status(201).json({message: "Utilisateur créé"}))
                .catch((err)=>res.status(400).json({err}))
        })
        .catch((err)=>res.status(500).json({err}))
 
}

exports.login = (req,res)=>{

    

    //crypter l'email
    const emailCrypto = cryptoJs.HmacSHA1(req.body.email, `process.env.SECRET_EMAIL`).toString();
    //controller si l'email est dans la base de donnée
    User.findOne({ email:emailCrypto})
    .then((user)=> {
        //si luser n'existe pas dans la bd
        if (!user) {
            return res.status(401).json({error: "Utilisateur non trouvé"})
        }
        bcrypt.compare(req.body.password, user.password)
            .then((test)=>{
                
                //si le password n'est pas bon
                if (!test) {
                    res.status(401).json({error: "Password non valide"})
                }
            })
            .catch((err)=> res.status(500).json({err}))
    })
    .catch((err)=> res.status(500).json({err}))

    
}