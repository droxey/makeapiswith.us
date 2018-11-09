const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    createdAt: { type: Date, default: Date.now() },
    name: { type: String, required: true },
    githubId: { type: String, required: true },
    email: { type: String, required: true },
    apis: { type: Schema.Types.ObjectId, ref: 'Api' },
    comments: { type: Schema.Types.ObjectId, ref: 'Comment'},
    likedApis: { type: Schema.Types.ObjectId, ref: 'Api'}
})
/// When user likes an api it will store in this array(likedApis), can then have section that shows fav apis


module.exports = mongoose.model('User', UserSchema);
