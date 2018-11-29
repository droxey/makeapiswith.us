const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/api/auth/callback/', passport.authenticate('github', { failureRedirect: '/auth/github' }), (req, res) => {
    res.status(200).send('Successfully logged in');

});

module.exports = router;
