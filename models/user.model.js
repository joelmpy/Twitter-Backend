const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({

    username: {type: String, required: true },
    password: { type: String, min: 8 , required: true},
    aboutMe: { type: String, max: 160 },
    picture: String,
    followerPeople: [ { type: mongoose.Types.ObjectId, ref: 'User' } ],
    followedPeople:[ { type: mongoose.Types.ObjectId, ref: 'User' } ],
    registrationDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UsersSchema)