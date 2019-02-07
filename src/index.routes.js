const express = require('express');
const userRoutes = require('./server/users/user.route');
const tagRoutes = require('./server/tags/tag.route');
const commentRoutes = require('./server/comments/comment.route');
const apiRoutes = require('./server/apis/api.route');
const authRoutes = require('./server/auth/auth.route');


const router = express.Router();

router.use('/users', userRoutes);
router.use('/apis', apiRoutes);
router.use('/tags', tagRoutes);
router.use('/comments', commentRoutes);
router.use('/auth', authRoutes);

module.exports = router;
