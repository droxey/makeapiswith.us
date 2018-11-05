const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    comment: { type: String, required: true }
})


module.exports = mongoose.model('Comment', CommentSchema);
