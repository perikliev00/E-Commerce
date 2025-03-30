module.exports = (req, res, next) => {
    if(req.session.user.email !== 'admin@email.com') {
        return res.redirect('/');
    } else {
        return next();
    }
}