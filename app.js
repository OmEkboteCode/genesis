const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Repository = require("./models/repository.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require("ejs-mate");
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

app.get(
  "/repositories",
  wrapAsync(async (req, res) => {
    const allRepository = await Repository.find({});
    res.render("repositories/index.ejs", { allRepository });
  }),
);

app.get(
  "/repositories/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const repository = await Repository.findById(id);
    res.render("repositories/show.ejs", { repository });
  }),
);

app.listen(3000, () => {
  console.log("Server is Listening to Port 3000");
});
