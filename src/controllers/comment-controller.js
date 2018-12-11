const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Api = require('../models/api');
const checkAuth = require('../middleware/check-auth');


//POST: creates new comment and stores in API and User
// router.post('/apis/:apiId/comments', checkAuth, (req, res) => {
//     const comment = new Comment(req.body);
//     comment.author = req.user._id;
//     comment.save().then(comment => {
//         return Api.findById(req.params.apiId)
//     }).then(api => {
//         console.log(api);
//         api.comments.unshift(comment);
//         api.save()
//         return res.send('comment was saved on review')
//     }).catch(console.error)
// })

router.post('/apis/:apiId', checkAuth, (req, res) => {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    comment.save().then(comment => {
        return User.findById(req.user._id);
    }).then(user => {
        user.comments.unshift(comment);
        user.save();
        return Api.findById(req.params.apiId)
    }).then(api => {
        api.comments.unshift(comment);
        api.save();
        return res.status(200).send('Successfully Created Comment');
    }).catch(err => {
        console.log(err.message);
    })
})

//DELETE: deletes comment IF the user trying to delete comment is the author
// router.delete('/apis/:apiId/comments/:id', (req, res) => {
//     Comment.findOneAndRemove(req.params.id).then(comment => {
//         res.send('Comment was deleted')
//     }).catch(console.error)
// })

router.delete('/apis/:apiId/comments/:id', checkAuth, (req, res) => {
    Comment.findById(req.params.id).then(comment => {
        if(req.user._id === comment.author ) {
            Comment.findOneAndRemove(comment._id).then(comment => {
                console.log('Comment was deleted');
                return res.status(200).send('Comment Deleted')
            }).catch(console.error)
        } else {
            console.log('You must be author of comment to delete')
            return res.status(400).send('User must be Author of comment to do that')
        }
    }).catch(console.error)
})




module.exports = router;
