const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/github', passport.authenticate('github'));

router.get('/api/auth/callback/', passport.authenticate('github', { failureRedirect: '/auth/github' }), (req, res) => {
    res.send('Successfully logged in');

});

module.exports = router;
