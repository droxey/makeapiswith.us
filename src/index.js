const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const apiController = require('./controllers/api-controller');
const commentController = require('./controllers/comment-controller');
const tagController = require('./controllers/tag-controller');
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');
const passportService = require('./services/passport');
const passport = require('passport');
const cookieSession = require('cookie-session');
const app = express();

///initialize passport (auth) and setup cookie session
app.use(cookieSession({
    maxAge: 25 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());


//Setup Middleware & Database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/make-apis-with-us', {useNewUrlParser: true});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




//Setup controllers
app.use('/', apiController);
app.use('/', commentController);
app.use('/', tagController);
app.use('/', authController);
app.use('/', userController);


///setup server
app.listen(3000, () => {
    console.log('App on port: 3000')
});


module.exports = app;
