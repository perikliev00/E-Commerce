module.exports = (req, res, next) => {
    if(req.session.user.cart.items.length === 0) {
        return res.redirect('/');
    } else {
        return next();
    }
}