const express = require("express");

const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedIn, isOwner, validateRepository } = require("../middleware.js");
const repositoryController = require("../controllers/repository.js")

//Index Route

router.get(
  "/",
  wrapAsync(repositoryController.index),
);

// New Route

router.get("/new", isLoggedIn, repositoryController.newForm);

//Recent Route

router.get("/recent", repositoryController.recent);

// Show Route

router.get(
  "/:id",
  wrapAsync(repositoryController.show),
);

// Create Route

router.post(
  "/",
  isLoggedIn,
  validateRepository,
  wrapAsync(repositoryController.create),
);

// Edit Route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(repositoryController.create),
);

// Update Route

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateRepository,
  wrapAsync(repositoryController.update),
);

// Delete Route

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(repositoryController.destroy),
);

module.exports = router;
