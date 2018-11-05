const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//// TODO:  Still need to add github repo, also need to make connection with user
const ProjectSchema = new Schema ({
    name: { type: String, required: true },
    repoLink: { type: String, required: true },
    author: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    tags: [{ type: String }]
})



module.exports = mongoose.model('Project', ProjectSchema);
