const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repositorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  language: {
    type: String,
  },
  visibility: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Repository = mongoose.model("Repository", repositorySchema);

module.exports = Repository;
