module.exports = function(req, res, next) {
    console.log(req.user)
    if(!req.user) {
        console.log('User must be signed in to do this ...')
        res.send('You must be signed in to do that.')
    } else {
        return next();
    }
}
