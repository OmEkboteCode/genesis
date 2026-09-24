const express = require("express");

const router = express.Router();
const Repository = require("../models/repository.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { repositorySchema } = require("../schema.js");
const User = require("../models/user.js");

const validateRepository = (req, res, next) => {
  let { error } = repositorySchema.validate(req.body);
  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMessage);
  } else {
    next();
  }
};

//Index Route

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allRepository = await Repository.find({}).populate("owner");
    res.render("repositories/index.ejs", { allRepository });
  }),
);

// New Route

router.get("/new", (req, res) => {
  res.render("repositories/new.ejs");
});

//Recent Route

router.get("/recent", (req, res) => {
  let id = req.signedCookies.recentRepoId;
  if (id === undefined) {
    return res.send("You Haven't Viewed Any Repositories Yet.");
  }
  console.log(id);
  res.redirect(`/repositories/${id}`);
});

// Show Route

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const repository = await Repository.findById(id).populate("owner");
    // console.log(repository);
    if (!repository) {
      req.flash("error", "Repository You Requested For Does Not Exist");
      return res.redirect("/repositories");
    }
    res.cookie("recentRepoId", id, { signed: true });

    res.render("repositories/show.ejs", { repository });
  }),
);

// Create Route

router.post(
  "/",
  validateRepository,
  wrapAsync(async (req, res, next) => {
    const username = req.body.repository.owner;
    const existingUser = await User.findOne({ username: username });
    if (existingUser === null) {
      req.flash("error", "User Not Found");
      // throw new ExpressError(404, "User Not Found");
      return res.redirect("/repositories/new");
    }

    const newRepository = new Repository({
      ...req.body.repository,
      owner: existingUser._id,
    });

    await newRepository.save();
    req.flash("success", "New Repository Created!");
    res.redirect("/repositories");
  }),
);

// Edit Route

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const repository = await Repository.findById(id).populate("owner");
    if (!repository) {
      req.flash("error", "Repository You Requested For Does Not Exist");
      return res.redirect("/repositories");
    }
    res.render("repositories/edit.ejs", { repository });
  }),
);

// Update Route

router.put(
  "/:id",
  validateRepository,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Repository.findByIdAndUpdate(id, { ...req.body.repository });
    req.flash("success", "Repository Updated!");
    res.redirect(`/repositories/${id}`);
  }),
);

// Delete Route

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedRepository = await Repository.findByIdAndDelete(id);
    console.log(deletedRepository);
    req.flash("success", "Repository Deleted!");
    res.redirect("/repositories");
  }),
);

module.exports = router;
