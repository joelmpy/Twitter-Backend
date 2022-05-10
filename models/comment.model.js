const mongoose = require("mongoose")

const CommentsSchema = new mongoose.Schema({

    ownerID: { type: mongoose.Types.ObjectId, ref: 'User' },
    tweetID: { type: mongoose.Types.ObjectId, ref: 'Tweet' } ,
    text: String
})

module.exports = mongoose.model('Comment', CommentsSchema)