const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const passport = require("passport");
const { isLoggedIn, saveRedirectUrl, isOwner } = require("../middleware.js");
const userController = require("../controllers/user.js");

// Users

router.get("/", wrapAsync(userController.index));

router.get("/:id/repositories", wrapAsync(userController.redirectToRepos));

// Delete User Route

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(userController.destroyUser),
);

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: true,
    }),
    userController.login,
  );

router.get("/logout", userController.logout);

module.exports = router;
