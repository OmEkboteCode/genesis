const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Repository = require("./repository.js")

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.post("findOneAndDelete", async (user) => {
  if (user) {
    await Repository.deleteMany({ owner: user._id });
  }
});

module.exports = mongoose.model("User", userSchema);

