const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//// TODO: connect author with user Schema and display the users github display name
const ApiSchema = new Schema ({
    name: { type: String, required: true },
    image: { type: String },
    repoLink: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: false },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
})

module.exports = mongoose.model('Api', ApiSchema);
