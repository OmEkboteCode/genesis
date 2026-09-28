const Repository = require("./models/repository");
const ExpressError = require("./utils/ExpressError.js");
const { repositorySchema } = require("./schema.js");
const User = require("./models/user.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You Must Login In To Create Repository");
    return res.redirect("/users/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let repository = await Repository.findById(id);
  if (!repository.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "You Are Not The Owner Of This Repository");
    return res.redirect(`/repositories/${id}`);
  }
  next();
};

module.exports.validateRepository = (req, res, next) => {
  let { error } = repositorySchema.validate(req.body);
  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMessage);
  } else {
    next();
  }
};
