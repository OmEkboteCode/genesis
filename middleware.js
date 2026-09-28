module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You Must Login In To Create Repository");
    return res.redirect("/users/login")
  }
  next()
};
