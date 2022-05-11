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

router.delete('/:id', async function (req, res) {
    const id = req.params.id
    try {
        await CommentsModel.deleteOne({ _id: id })
        res.json({message: "The comment has been deleted"})
    }catch(err) {
        res.status(500).send(err)
    }

})

module.exports = router