const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/api/auth/callback/', passport.authenticate('github', { failureRedirect: '/auth/github' }), (req, res) => {
    res.status(200).send('Successfully logged in');
    console.log(req.user);

});

////GET: Route logs out the user
router.get('/sign-out', (req, res) => {
        req.logout();
        return res.status(200).send('Succesfully Signed Out User')
    });

module.exports = router;
