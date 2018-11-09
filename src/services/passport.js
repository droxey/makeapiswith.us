const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');
////Serailize session
//Directly below is copied from docs example
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


////// NOTE: Below is how I have previously implemented passport
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//     User.findById(id).then(user => {
//         done(null, user);
//     }).catch(err => {
//         console.log(err.message);
//     });
// });

// passport.use(new GithubStrategy({
//     clientID: process.env.CLIENT_ID,
//     ClientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/api/auth/callback/'
// },
//
// function(accessToken, refreshToken, params,  profile, done) {
//     console.log(params);
//     User.findOne({ githubId: profile.id}).then(user => {
//         if(user) {
//             done(err, user);
//         } else {
//             const user = new User ({
//                 email: profile.emails.value,
//                 githubId: profile.id,
//                 accessToken: accessToken
//             })
//             user.save().then(user => {
//                 return done(null, profile);
//             })
//         }
//     })
// }));


// ////BELOW IS COPIED FROM DOCS
passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    ClientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, params,  profile, done) {
    User.findOrCreateOauth(params.info.email).then(function(user) {
        return done(null, user);
    }).catch(function(reason) {
        return done(reason, null);
    });
}));
