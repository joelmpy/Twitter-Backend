const express = require("express");
const app = express();
const port = 3003;
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passport')
const UserRouter = require('./controllers/User.controller');

mongoose.connect('mongodb://localhost:27017/express_login');

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(session({
  secret: 'MyAwesomeSecret', // string permettant de "signer" nos sessions
  resave: true, // nous permet de garder notre session toujours a jour
  saveUninitialized: false // nous permet de sauvegarder notre session
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

app.use('/', UserRouter)
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

