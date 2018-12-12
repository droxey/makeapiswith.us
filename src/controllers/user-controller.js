const express = require('express');
const router = express.Router();
const User = require('../models/user');

//GET: route returns list of users
// QUESTION: If I have this route do I need to parse so I can only return certain properties (exclude password and such);
router.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.json(users);
    }).catch(console.error)
})
//GET: returns a Specific User object. APIs are then populated so you can access its properties
router.get('/users/:id', (req, res) => {
    User.findById(req.params.id).populate('apis').then(user => {
        res.json(user);
    }).catch(err => {
        console.log(err.message);
    })
})

//GET: returns list of APIs by specific user
router.get('/users/:id/apis', (req, res) => {
    User.findById(req.params.id).populate('apis').then(user => {
        res.json(user.apis);
    }).catch(console.error)
})

module.exports = router;
