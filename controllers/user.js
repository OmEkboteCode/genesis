const User = require("../models/user.js");
const Repository = require("../models/repository.js");

module.exports.index = async (req, res) => {
  const allUsers = await User.find({});
  res.render("users/index.ejs", { allUsers });
};

module.exports.redirectToRepos = async (req, res) => {
  let { id } = req.params;
  const user = await User.findById(id);
  const repositories = await Repository.find({ owner: id });
  res.render("users/show.ejs", { repositories, user });
};

module.exports.destroyUser = async (req, res) => {
  let { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect("/users");
};

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome To Genesis!");
      res.redirect("/repositories");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome Back To Genesis!");
  let redirectUrl = res.locals.redirectUrl || "/repositories";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You Are Logged Out!");
    res.redirect("/repositories");
  });
};
