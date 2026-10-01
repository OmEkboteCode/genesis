const express = require("express");

const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedIn, isOwner, validateRepository } = require("../middleware.js");
const repositoryController = require("../controllers/repository.js");

router
  .route("/")
  .get(wrapAsync(repositoryController.index))
  .post(isLoggedIn, validateRepository, wrapAsync(repositoryController.create));

// New Route

router.get("/new", isLoggedIn, repositoryController.newForm);

//Recent Route

router.get("/recent", repositoryController.recent);

// Show Route

router
  .route("/:id")
  .get(wrapAsync(repositoryController.show))
  .put(
    isLoggedIn,
    isOwner,
    validateRepository,
    wrapAsync(repositoryController.update),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(repositoryController.destroy));

router;

// Edit Route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(repositoryController.edit),
);

// Stars Route

router.post("/:id/star", isLoggedIn, wrapAsync(repositoryController.star));

router.delete("/:id/star", isLoggedIn, wrapAsync(repositoryController.unstar))

module.exports = router;
