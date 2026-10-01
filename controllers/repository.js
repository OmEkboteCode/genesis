const Repository = require("../models/repository.js");

module.exports.index = async (req, res) => {
  const allRepository = await Repository.find({}).populate("owner");
  res.render("repositories/index.ejs", { allRepository });
};

module.exports.newForm = (req, res) => {
  res.render("repositories/new.ejs");
};

module.exports.recent = (req, res) => {
  let id = req.signedCookies.recentRepoId;
  if (id === undefined) {
    return res.send("You Haven't Viewed Any Repositories Yet.");
  }
  console.log(id);
  res.redirect(`/repositories/${id}`);
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  const repository = await Repository.findById(id).populate("owner");
  // console.log(repository);
  const hasStarred =
    req.user && repository.stars.some((userId) => userId.equals(req.user._id));
  if (!repository) {
    req.flash("error", "Repository You Requested For Does Not Exist");
    return res.redirect("/repositories");
  }
  res.cookie("recentRepoId", id, { signed: true });

  res.render("repositories/show.ejs", { repository, hasStarred });
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const repository = await Repository.findById(id).populate("owner");
  if (!repository) {
    req.flash("error", "Repository You Requested For Does Not Exist");
    return res.redirect("/repositories");
  }
  res.render("repositories/edit.ejs", { repository });
};

module.exports.create = async (req, res, next) => {
  const newRepository = new Repository({
    ...req.body.repository,
    owner: req.user._id,
  });

  await newRepository.save();
  req.flash("success", "New Repository Created!");
  res.redirect("/repositories");
};

module.exports.update = async (req, res) => {
  let { id } = req.params;
  await Repository.findByIdAndUpdate(id, { ...req.body.repository });
  req.flash("success", "Repository Updated!");
  res.redirect(`/repositories/${id}`);
};

module.exports.destroy = async (req, res) => {
  let { id } = req.params;
  let deletedRepository = await Repository.findByIdAndDelete(id);
  console.log(deletedRepository);
  req.flash("success", "Repository Deleted!");
  res.redirect("/repositories");
};

module.exports.star = async (req, res) => {
  let { id } = req.params;
  await Repository.findByIdAndUpdate(id, {
    $addToSet: {
      //Add this value to the array, but don't add it if it's already there.
      stars: req.user._id,
    },
  });
  res.redirect(`/repositories/${id}`);
};

module.exports.unstar = async (req, res) => {
  let { id } = req.params;
  await Repository.findByIdAndUpdate(id, {
    $pull: {
      //Add this value to the array, but don't add it if it's already there.
      stars: req.user._id,
    },
  });
  res.redirect(`/repositories/${id}`);
};
