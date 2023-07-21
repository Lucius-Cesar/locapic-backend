var express = require('express');
var router = express.Router();
const Place = require("../models/places")
const { checkBody } = require('../modules/checkBody');

module.exports = router;


router.post("/", (req, res)  => {
    if(!checkBody(req.body, ["nickname", "name", "latitude","longitude"])){
        res.json({result: false, error: "Body field incorrect or empty"})
    }
    else{
        newPlace = new Place({
            nickname: req.body.nickname,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
        newPlace.save()
        .then(newPlaceData => 
            res.json({
                result: true, 
                newPlace: newPlaceData
            }))
    }
    
})

router.get("/:nickname", (req, res)  => {
    Place.find({
        nickname: req.params.nickname
    }).then(data => {
        console.log(data)
            res.json({
                result: true, 
                places: data
            })  
    })
})

router.delete("/", (req, res)  => {
    if(!checkBody(req.body, ["nickname", "name"])){
        res.json({result: false, error: "Body field incorrect or empty"})
    }
    else{
        Place.deleteOne({
            nickname: req.body.nickname,
            name: req.body.name
        }).then(data => {
            if(data.deletedCount > 0){
                res.json({result: true})
            }
            else{
                res.json({result: false, msg: `no place found for nickname ${req.body.nickname} and place name ${req.body.name}`})
            }
        })
    }
})

module.exports = router