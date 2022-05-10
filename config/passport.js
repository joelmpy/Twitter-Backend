const passport = require('passport')
const LocalStrategy = require('passport-local');
const UsersModel = require('../models/user.model');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',

  },
    function (email, password, done) {

      UsersModel.findOne({ email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        bcrypt.compare(password, user.password).then(isTrue => {
          if (!isTrue) {
            return done(null, false);
          }
          return done(null, user);
        })
      })
    })
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  UsersModel.findById(_id).then(user => {
    done(null, user)
  })
})

module.exports = passport;