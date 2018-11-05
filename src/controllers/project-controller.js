///MAIN TODO:
/*
1: create a route that returns list of all projects

2: create a route that returns a single project with relevant info

3: allow end point to create a new projects
    - figure out how to allow users to upload github repo
4: be able to edit projects

5: be able to delete projects - from Admin dashboard or at user level
*/// require relevant files
const express = require('express');
const router = express.Router();
const Project = require('../models/project');


///GET: returns JSON object including all projects
router.get('/projects', (req, res) => {
    Project.find({}).then(proj => {
        res.send(proj)
    }).catch(console.error)
});

///GET: returns indiviaul project
router.get('/projects/:id', (req, res) => {
    Project.findById(req.params.id).then(project => {
        res.json(project);
    }).catch(console.error)
});


router.post('/projects', (req, res) => {
    const project = new Project(req.body);
    project.save().then(proj => {
        console.log(proj);
        res.send('Project Saved');
    }).catch(console.error)
});

//delete api
router.delete('/projects/:id', (req, res) => {
    Project.findOneAndRemove({ _id: req.params.id }).then(project => {
        res.send('The project was deleted');
    }).catch(console.error);
})


module.exports = router;
