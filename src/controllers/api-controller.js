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
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
// TODO: Need to create a PUT Route

/*=========
GET ROUTES
==========*/


///GET: returns JSON object including all apis
router.get('/', (req, res) => {
    Api.find({}).then(apis => {
        console.log(req.user);
        res.json(apis)
    }).catch(console.error)
});

///GET: returns indiviaul api
router.get('/:id', (req, res) => {
    Api.findById(req.params.id).populate('author').populate({
        path: 'comments',
            populate: {
                path: 'author'
            }
    }).then(api => {
        res.json(api);
    }).catch(console.error)
});
//GET: returns post with specific tags
router.get('/tags/:tag', (req, res) => {
    const tag = req.params.tag;
    Api.find({ tags: tag }).then(apis => {
        res.json(apis)
    }).catch(console.error)
})



/*========
EDIT, POST, DELETE POSTS
=========*/

//POST: creates a new API && saves is to specific user
router.post('/', checkAuth, (req, res) => {
        const api = new Api(req.body);
        api.author = req.user._id;
        api.save().then(api => {
            return User.findById(req.user._id);
        }).then(user => {
            user.apis.unshift(api);
            user.save();
            return res.status(200).send('API successfully created');
        }).catch(err => {
            console.log(err.message);
            return res.status(400).send(err)
        })
    
    
})


router.delete('/:id', checkAuth, (req, res) => {
    
    Api.findOne({ _id: req.params.id }).then(api => {
        if (req.user._id === api.author ) {
            Api.findOneAndRemove(api._id).then(api => {
                return res.status(200).send('API was deleted')
            }).catch(console.error)
        } else {
            res.send('You are not the owner of this API and cannot do that.')
        }
    }).catch(console.error)
})

//PUT: allows user to update specific API info ONLY IF the user trying to edit is the Author of post
router.put('/:id', checkAuth, (req, res) => {
    Api.findById(req.params.id).then(api => {
        if ( api.author === req.user._id ) {
            api.set(req.body);
            api.save().then(updatedApi => {
                console.log(updatedApi);
                return res.status(200).send('API was editted');
            }).catch(console.error)
        } else {
            return res.send('You must be the author of API to edit its information.')
        }
    }).catch(console.error)
})





module.exports = router;
