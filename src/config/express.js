const express = require('express');
require('dotenv').config();
const passportService = require('../services/passport');
const passport = require('passport');
const routes = require('../index.routes');
const cookieSession = require('cookie-session');
const app = express();

///initialize passport (auth) and setup cookie session
app.use(cookieSession({
  maxAge: 25 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());

//  Setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Mount all routes on /api path
app.use('/api', routes);

module.exports = app;