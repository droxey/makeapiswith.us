const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    createdAt: { type: Date, required: true, default: Date.now()},
    comment: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post'},
    author: { type: Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Comment', CommentSchema);
