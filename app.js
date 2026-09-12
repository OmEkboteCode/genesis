const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Repository = require("./models/repository.js");
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
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Working");
});

// app.get("/testrepo", async (req, res) => {
//     let sampleRepo = new Repository({
//         name: "Genesis",
//         description: "A developer collaboration platform built from the ground up while exploring modern web development and software engineering.",
//         language: "Javascript",
//         visibility: "Public",
//         owner: "Om",
//     });
//     await sampleRepo.save();
//     console.log("Sample Was Saved");
//     res.send("Successful Testing")
// })

app.listen(3000, () => {
  console.log("Server is Listening to Port 3000");
});

