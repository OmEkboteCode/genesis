const mongoose = require("mongoose");
const initData = require("./data.js");
const Repository = require("../models/repository.js");

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

const initDB = async () => {
  await Repository.deleteMany({});
  await Repository.insertMany(initData.data);
  console.log("Data Was Initialized");
};

initDB();
