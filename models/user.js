const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Repository = require("./repository.js");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(passportLocalMongoose);

userSchema.post("findOneAndDelete", async (user) => {
  if (user) {
    await Repository.deleteMany({ owner: user._id });
  }
});

module.exports = mongoose.model("User", userSchema);
