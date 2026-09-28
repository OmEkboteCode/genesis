const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const Repository = require("../models/repository.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { userSchema } = require("../schema.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl, isOwner } = require("../middleware.js");

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
  isLoggedIn,
  isOwner,
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
  }),
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome Back To Genesis!");
    let redirectUrl = res.locals.redirectUrl || "/repositories";
    res.redirect(redirectUrl);
  },
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You Are Logged Out!");
    res.redirect("/repositories");
  });
});

module.exports = router;
