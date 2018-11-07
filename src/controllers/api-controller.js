///MAIN TODO:
/*
1: create a route that returns list of all apis

2: create a route that returns a single api with relevant info

3: allow end point to create a new apis
    - figure out how to allow users to upload github repo
4: be able to edit apis

5: be able to delete apis - from Admin dashboard or at user level
*/
const express = require('express');
const router = express.Router();
const Api = require('../models/api');
// TODO: Need to create a PUT Route

/*=========
GET ROUTES
==========*/

///GET: returns JSON object including all apis
router.get('/apis', (req, res) => {
    Api.find({}).then(apis => {
        res.send(apis)
    }).catch(console.error)
});

///GET: returns indiviaul api
router.get('/apis/:id', (req, res) => {
    Api.findById(req.params.id).then(api => {
        res.json(api);
    }).catch(console.error)
});
// ------GET: returns post with specific tags
router.get('/apis/tags/:tag', (req, res) => {
    const tag = req.params.tag;
    Api.find({ tags: tag }).then(apis => {
        res.json(apis)
    }).catch(console.error)
})

/*========
EDIT, POST, DELETE POSTS
=========*/

//POST: creates a new API
router.post('/apis', (req, res) => {
    const api = new Api(req.body);
    api.save().then(api => {
        console.log(api);
        res.send('Api Saved');
    }).catch(err => {
        res.status(400);
        console.log(err.message);
    })
});

//DELETE: deletes specific API
router.delete('/apis/:id', (req, res) => {
    Api.findOneAndRemove({ _id: req.params.id }).then(api => {
        res.send('The api was deleted');
    }).catch(console.error);
})

//PUT: allows user to update specific API
router.put('/apis/:id', (req, res) => {
    Api.findById(req.params.id).then(api => {
        api.set(req.body);
        return api.save()
    }).then(updatedApi => {
        console.log('Api was editted')
        res.send('API information was updated... ')
    })
})



module.exports = router;
