const Sauce = require("../model/sauce_model");

exports.createSauce = (req,res)=>{
    
    const sauceValue = JSON.parse(req.body.sauce);


    const sauce = new Sauce({
        userId: sauceValue.userId,
        name: sauceValue.name,
        manufacturer: sauceValue.manufacturer,
        description: sauceValue.description,
        mainPepper: sauceValue.mainPepper,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        heat: sauceValue.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })

    sauce.save()
        .then((prod)=> res.status(201).json({message: prod}))
        .catch((err)=>res.status(401).json({err}))
}

exports.getOneSauce = (req,res)=>{

    Sauce.findOne({_id: req.params.id})
    .then((prod)=> res.status(200).json(prod))
    .catch((err)=>res.status(401).json({err}))
}
exports.getAllSauce = (req,res)=>{

    Sauce.find()
    .then((prod)=> res.status(200).json(prod))
    .catch((err)=>res.status(401).json({err}))
}






exports.modifySauce = (req,res)=>{
    

    const ProductObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body };

    const id = req.params.id
    Sauce.updateOne({_id: id}, {...ProductObject, _id: id})
     .then(()=>res.status(200).json({message: "Produit modifié"}))
     .catch((err)=> res.status(403).json({err}))

    
}

exports.deleteSauce = (req,res)=>{
    Sauce.deleteOne({_id: req.params.id})
    .then(()=> res.status(201).json({message: "Sauce supprimé" }))
    .catch((err)=>res.status(401).json({err}))
}



exports.likeSauce = (req,res)=> {
    let like = req.body.like;
    let userId = req.body.userId;
        console.log(like);
        console.log(userId);
   
   
//         if (like === 1) {
//             Sauce.findById(id)
//             .then((sauces)=>addLike(sauces, userId, res))
//             .catch((err)=> res.status(400).json({err}))
            
            
//         }else if (like === -1) {
//             Sauce.findById(id)
//             .then((sauces)=>disLike(sauces, userId, res))
//             .catch((err)=> res.status(400).json({err}))
            
            
//         }else if (like === 0) {
//             Sauce.findById(id)
//             .then((sauces)=>removeLike(sauces, userId, res, like))
//             .catch((err)=> res.status(400).json({err}))
            
            
//         }
Sauce.findOne({_id: req.params.id})
    .then((prod)=> {
        //////////////////////////likes//////////////////////////
        if (!prod.usersLiked.includes(req.body.userId) && req.body.like === 1) {
            
            Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.body.userId}} )
                .then(()=>res.status(200).json({message: "user like +1"}))
                .catch((err)=> res.status(403).json({err}))  
        }
        
        if (prod.usersLiked.includes(req.body.userId) && req.body.like === 0) {
            Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}} )
                .then(()=>res.status(200).json({message: "user like 0"}))
                .catch((err)=> res.status(403).json({err}))     
        }


        /////////////////dislikes////////////////////////
        if (!prod.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
            
            Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.body.userId}} )
                .then(()=>res.status(200).json({message: "user dislike +1"}))
                .catch((err)=> res.status(403).json({err}))  
        }
        
        if (prod.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
            Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}} )
                .then(()=>res.status(200).json({message: "user like 0"}))
                .catch((err)=> res.status(403).json({err}))     
        }
        
    })
    .catch((err)=>res.status(404).json({err}))
}


// function addLike(sauces, userId, res) {
//     const userLiked = sauces.usersLiked
//     console.log(userLiked);

//     let arrUserId = userLiked.includes(userId)? sauces.usersDisliked : sauces.usersLiked;
//     console.log("----------------------------------test ArrayUserId---------------------------")
//     console.log(arrUserId);





//         if (userLiked.includes(userId)) {
//             return res.status(400).json({error: "hello Request"})
//         }else{
//             userLiked.push(userId)
//             ++sauces.likes;
//             sauces.save()
//             .then(()=> res.status(201).json({message: "produit sauvgardé"}))
//             .catch(err=> res.status(401).json({err: "test 1"}))

//             console.log(sauces);
//         }   
// }

// function disLike(sauces, userId, res) {
//     const userDisliked = sauces.usersDisliked
//         if (userDisliked.includes(userId)) {
//             return res.status(400).json({error: "edde Request"})
//         }else{
//             userDisliked.push(userId)
//             ++sauces.dislikes;
//             sauces.save()
//             .then(()=> res.status(200).json({message: "produit sauvgardé"}))
//             .catch(err=> res.status(400).json({err: "test2"}))
            
//             console.log(sauces);
//         }   
// }

// function removeLike(sauces, userId, res, like) {
//     const userDisliked = sauces.usersDisliked
//     const userLiked = sauces.usersLiked

//     let likeUpdate = userLiked.includes(userId)? sauces.likes : sauces.dislikes
//     likeUpdate--
//     userLiked.includes(userId)? --sauces.likes : --sauces.dislikes

//     let arrUserId = userLiked.includes(userId)? sauces.usersDisliked : sauces.usersLiked;
//     let filterUserId = arrUserId.filter(user => user !== sauces.userId)
//     arrUserId = filterUserId
    
//     sauces.save()
//             .then(()=> res.status(200).json({message: "produit sauvgardé"}))
//             .catch(err=> res.status(400).json({err}))

//     console.log(sauces);

// }