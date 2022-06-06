const Sauce = require("../model/sauce_model");

exports.createSauce = (req,res)=>{
    
    const sauceValue = JSON.parse(req.body.sauce);
    console.log(sauceValue);


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
    //console.log(sauce);

    sauce.save()
        .then((prod)=> res.status(201).json({message: prod}))
        .catch((err)=>res.status(401).json({err}))
}

exports.getOneSauce = (req,res)=>{

    Sauce.findOne({_id: req.params.id})
    .then((prod)=> res.status(201).json(prod))
    .catch((err)=>res.status(401).json({err}))
}
exports.getAllSauce = (req,res)=>{

    Sauce.find()
    .then((prod)=> res.status(201).json(prod))
    .catch((err)=>res.status(401).json({err}))
}






exports.modifySauce = (req,res)=>{
    // Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id} )
    // .then((prod)=> res.status(200).json({message: "Sauce modifié", prod}))
    // .catch((err)=>res.status(401).json({err}))

    //////////////////////
    const ProductObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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



exports.likeProduct = (req,res)=> {
    let like = req.body.like;
    let userId = req.body.userId;
    const id = req.params.id;

    if (like === -1 || like === 0 || like === 1){
        if (like === 1) {
            Sauce.findById(id)
            .then((product)=>addLike(product, userId, res))
            .catch((err)=> res.status(400).json({err}))
            
            
        }else if (like === -1) {
            Sauce.findById(id)
            .then((product)=>disLike(product, userId, res))
            .catch((err)=> res.status(400).json({err}))
            
            
        }else if (like === 0) {
            Sauce.findById(id)
            .then((product)=>removeLike(product, userId, res, like))
            .catch((err)=> res.status(400).json({err}))
            
            
        }
    } else{
        return res.status(400).json({error: "test Request"})
    }
}


function addLike(product, userId, res) {
    const userLiked = product.usersLiked
        if (userLiked.includes(userId)) {
            return res.status(400).json({error: "hello Request"})
        }else{
            userLiked.push(userId)
            ++product.likes;
            product.save()
            .then(()=> res.status(201).json({message: "produit sauvgardé"}))
            .catch(err=> res.status(401).json({err}))

            console.log(product);
        }   
}

function disLike(product, userId, res) {
    const userDisliked = product.usersDisliked
        if (userDisliked.includes(userId)) {
            return res.status(400).json({error: "edde Request"})
        }else{
            userDisliked.push(userId)
            ++product.dislikes;
            product.save()
            .then(()=> res.status(200).json({message: "produit sauvgardé"}))
            .catch(err=> res.status(400).json({err}))
            
            console.log(product);
        }   
}

function removeLike(product, userId, res, like) {
    const userDisliked = product.usersDisliked
    const userLiked = product.usersLiked

    let likeUpdate = userLiked.includes(userId)? product.likes : product.dislikes
    likeUpdate--
    userLiked.includes(userId)? --product.likes : --product.dislikes

    let arrUserId = userLiked.includes(userId)? product.usersDisliked : product.usersLiked;
    let filterUserId = arrUserId.filter(user => user !== product.userId)
    arrUserId = filterUserId
    
    product.save()
            .then(()=> res.status(200).json({message: "produit sauvgardé"}))
            .catch(err=> res.status(400).json({err}))

    console.log(product);

}