const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const Repository = require("../models/repository.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { userSchema } = require("../schema.js");

const validateUser = (req, res, next) => {
  let { error } = userSchema.validate(req.body);
  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMessage);
  } else {
    next();
  }
};

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

module.exports = router;
