const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({

    username: String,
    password: { type: String, min: 8 },
    aboutMe: { type: String, max: 160 },
    picture: String,
    followerPeople: [ { type: mongoose.Types.ObjectId, ref: 'User' } ],
    followedPeople:[ { type: mongoose.Types.ObjectId, ref: 'User' } ],
    registrationDate: { type: Date, required: true }
})

module.exports = mongoose.model('User', UsersSchema)