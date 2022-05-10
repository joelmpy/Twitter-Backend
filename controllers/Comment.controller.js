const express = require("express");
const router = express.Router();
const passport = require('passport')
const UsersModel = require('../models/user.model');
const TweetsModel = require('../models/tweet.model');
const CommentsModel = require('../models/comment.model');
const expressValidator = require("express-validator");

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(403).send('You need to be authenticated')
    }
}

router.post('/comment-post', checkAuth, function (req, res) {
    const body = req.body;
    const newComment = new CommentsModel({body})

    newComment.save().then(comment => {
        res.json(comment)
    });
});

module.exports = router