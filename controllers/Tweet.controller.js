const express = require("express");
const router = express.Router();
const TweetsModel = require('../models/tweet.model');

router.get('/', function (req, res) {
    res.send("tweets");
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
    console.log(body);

    const newtweet = new TweetsModel(body)

    newtweet.save().then(resultat => {
        res.json(resultat)
    }).catch(err => {
        res.status(500).send(err)
    })
});

module.exports = router