const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const Repository = require("../models/repository.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { userSchema } = require("../schema.js");
const passport = require("passport");

// const validateUser = (req, res, next) => {
//   let { error } = userSchema.validate(req.body);
//   if (error) {
//     let errorMessage = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errorMessage);
//   } else {
//     next();
//   }
// };

// Users

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allUsers = await User.find({});
    res.render("users/index.ejs", { allUsers });
  }),
);

router.get(
  "/:id/repositories",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const user = await User.findById(id);
    const repositories = await Repository.find({ owner: id });
    res.render("users/show.ejs", { repositories, user });
  }),
);

// Delete User Route

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/users");
  }),
);

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("success", "Welcome To Genesis!");
      res.redirect("/repositories");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/users/signup");
    }
  }),
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async(req,res) => {
    req.flash("success", "Welcome Back To Genesis!");
    res.redirect("/repositories")
  }
);

module.exports = router;
