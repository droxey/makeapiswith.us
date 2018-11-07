const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Api = require('../models/api');


//post new comment
router.post('/apis/:apiId/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.save().then(comment => {
        console.log(comment)
        return Api.findById(req.params.apiId)
    }).then(api => {
        console.log(api);
        console.log('------------');
        api.comments.unshift(comment);
        api.save()
        return res.send('comment was saved on review')
    }).catch(console.error)
})


router.delete('/apis/:apiId/comments/:id', (req, res) => {
    Comment.findOneAndRemove(req.params.id).then(comment => {
        res.send('Comment was deleted')
    }).catch(console.error)
})




module.exports = router;
