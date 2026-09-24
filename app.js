const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
  secret: "mysecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(cookieParser("secretcode"));

const repositories = require("./routes/repository.js");
const users = require("./routes/user.js");

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

app.get("/session/register", (req, res) => {
  let { name = "Anonymous" } = req.query;
  req.session.name = name;
  console.log(req.session.name);
  res.redirect("/session/hello");
});

app.get("/session/flash", (req, res) => {
  req.flash("success", "This is a success message!");
  res.redirect("/session/hello");
});

app.get("/session/hello", (req, res) => {
  let message = req.flash("success");
  res.send(`Hello, ${req.session.name}. ${message}`);
});

app.use("/repositories", repositories);
app.use("/users", users);

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
