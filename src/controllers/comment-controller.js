const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Api = require('../models/api');
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');
////creates new comment on specific API at POST: /apis/:apiId
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
//Deletes comment if author is current user at DELETE: /apis/:apiId/comments/:commentId
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
