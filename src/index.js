//require packages:
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const projectController = require('./controllers/project-controller');
const commentController = require('./controllers/comment-controller');
const app = express();

//Setup Middleware
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/make-apis-with-us', {useNewUrlParser: true});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//Setup controllers
app.use('/', projectController);
app.use('/', commentController);


///setup server
app.listen(5000, () => {
    console.log('App on port: 5000')
});
