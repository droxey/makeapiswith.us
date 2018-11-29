const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');
////Serailize session
////finds user id and attaches to cookie to track a users session
passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
})


passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['user:email']
},
function(accessToken, refreshToken, profile, done) {
    User.findOne({ githubId: profile.id }).then(user => {
        if(user) {
            done(null, user);
        } else {

            const user = new User({
                username: profile.username,
                email: profile.emails[0].value,
                profileImage: profile._json.avatar_url,
                githubId: profile.id,
                accessToken: accessToken

            })
            user.save().then(user => {
                console.log('Below is the saved User:')
                console.log(user);
                done(null, user);
            }).catch(console.error)
        }
    }).catch(console.error)
}
))
