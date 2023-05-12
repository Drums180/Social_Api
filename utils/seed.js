const mongoose = require("mongoose");
const db = require("../config/connection");
const { User, Thought } = require("../models");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const userSeed = [
  {
    username: "user1",
    email: "user1@test.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "user2",
    email: "user2@test.com",
    thoughts: [],
    friends: [],
  },
];

const thoughtSeed = [
  {
    thoughtText: "First thought",
    username: "user1",
    reactions: [],
  },
  {
    thoughtText: "Second thought",
    username: "user2",
    reactions: [],
  },
];

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeed);

    await Thought.deleteMany({});
    await Thought.create(thoughtSeed);

    console.log("All done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
