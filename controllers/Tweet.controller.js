const express = require("express");
const router = express.Router();
const TweetsModel = require('../models/tweet.model');

router.get('/', function (req, res) {
    TweetsModel.find({}).exec().then(tweets => res.json(tweets) )
});

const checkAuth = (req, res, next) => {
    console.log(req.isAuthenticated())
    console.log(req.user)
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(403).send('You need to be authenticated')
    }
}

router.post('/', checkAuth, function (req, res, next) {
    const body = req.body
    const info = req.user
    console.log("INFO USER", info);
    console.log("INFO BODY", body);

    const newtweet = new TweetsModel(body)
    newtweet.ownerID = req.user._id
    newtweet.save().then(resultat => {
        res.json(resultat)
    }).catch(err => {
        res.status(500).send(err)
    })
});

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    try {
        await TweetsModel.deleteOne({ _id: id })
        res.json({message: "The tweet has been deleted"})
    }catch(err) {
        res.status(500).send(err)
    }

})

module.exports = router