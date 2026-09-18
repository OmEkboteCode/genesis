const mongoose = require("mongoose");

const initData = require("./data.js");
const initData2 = require("./data2.js");

const User = require("../models/user.js");
const Repository = require("../models/repository.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/genesis";

const main = async () => {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    await initDB();

    await mongoose.connection.close();
};

const initDB = async () => {
    await User.deleteMany({});
    await Repository.deleteMany({});

    const users = await User.insertMany(initData2.data);

    const userMap = {};

    users.forEach((user) => {
        userMap[user.username] = user._id;
    });

    const repositories = initData.data.map((repository) => {
        return {
            name: repository.name,
            description: repository.description,
            language: repository.language,
            visibility: repository.visibility,
            owner: userMap[repository.ownerUsername],
            createdAt: repository.createdAt,
        };
    });

    await Repository.insertMany(repositories);

    console.log("Users and repositories initialized");
};

main().catch((err) => {
    console.log(err);
});