const express = require("express");
const router = express.Router();
const CommentsModel = require('../models/comment.model');


const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(403).send('You need to be authenticated')
    }
}

router.post('/', checkAuth, function (req, res) {
    const body = req.body;
    const newComment = new CommentsModel(body)

    newComment.save().then(comment => {
        res.json(comment)
    });
});

module.exports = router