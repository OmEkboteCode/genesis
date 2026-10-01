const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const Repository = require("../models/repository.js");
const wrapAsync = require("../utils/wrapAsync.js");

const passport = require("passport");
const { isLoggedIn, saveRedirectUrl, isOwner } = require("../middleware.js");
const userController = require("../controllers/user.js")

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
  wrapAsync(userController.index),
);

router.get(
  "/:id/repositories",
  wrapAsync(userController.redirectToRepos),
);

// Delete User Route

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(userController.destroyUser),
);

router.get("/signup", userController.renderSignupForm);

router.post(
  "/signup",
  wrapAsync(userController.signup),
);

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
