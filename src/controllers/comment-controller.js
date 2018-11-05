const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Project = require('../models/project');


//post new comment
router.post('/projects/:projectId/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.save().then(comment => {
        console.log(comment)
        return Project.findById(req.params.projectId)
    }).then(project => {
        console.log(project)
        console.log('------------');
        project.comments.unshift(comment);
        project.save()
        return res.send('comment was saved on review')
    }).catch(console.error)
})


router.delete('/projects/:projectId/comments/:id', (req, res) => {
    Comment.findOneAndRemove(req.params.id).then(comment => {
        res.send('Comment was deleted')
    }).catch(console.error)
})




module.exports = router;
