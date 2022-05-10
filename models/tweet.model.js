const mongoose = require("mongoose")

const TweetsSchema = new mongoose.Schema({

    ownerID: String,
    text: { type: String, max: 280 },
    like: Number,
    numRetweets: Number,
    numComments: Number,
    IsAReweet: Boolean,
    retweetUserID: { type: mongoose.Types.ObjectId, ref: 'User' } 
})

module.exports = mongoose.model('Tweet', TweetsSchema)