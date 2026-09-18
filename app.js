const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Repository = require("./models/repository.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require("ejs-mate");
const { repositorySchema } = require("./schema.js");
// const { repositorySchema } = require("./schema.js")

const MONGO_URL = `mongodb://127.0.0.1:27017/genesis`;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Working");
});

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

app.get(
  "/repositories",
  wrapAsync(async (req, res) => {
    const allRepository = await Repository.find({});
    res.render("repositories/index.ejs", { allRepository });
  }),
);

// New Route

app.get("/repositories/new", (req, res) => {
  res.render("repositories/new.ejs");
});

// Show Route

app.get(
  "/repositories/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const repository = await Repository.findById(id);
    res.render("repositories/show.ejs", { repository });
  }),
);

// Create Route

app.post(
  "/repositories",
  validateRepository,
  wrapAsync(async (req, res, next) => {
    const newRepository = new Repository(req.body.repository);
    await newRepository.save();
    res.redirect("/repositories");
  }),
);

// Edit Route

app.get(
  "/repositories/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const repository = await Repository.findById(id);
    res.render("repositories/edit.ejs", { repository });
  }),
);

// Update Route

app.put(
  "/repositories/:id",
  validateRepository,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Repository.findByIdAndUpdate(id, { ...req.body.repository });
    res.redirect(`/repositories/${id}`);
  }),
);

// Delete Route

app.delete(
  "/repositories/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedRepository = await Repository.findByIdAndDelete(id);
    console.log(deletedRepository);
    res.redirect("/repositories");
  }),
);

app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("error.ejs", { err, message });
});

app.listen(3000, () => {
  console.log("Server is Listening to Port 3000");
});
