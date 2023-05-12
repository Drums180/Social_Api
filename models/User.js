const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create a virtual property `thoughtCount` that gets the amount of thoughts per user
UserSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.length;
});

// get count of friends on retrieval
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Instance method to add a friend
UserSchema.methods.addFriend = function (friendId) {
  if (!this.friends.includes(friendId)) {
    this.friends.push(friendId);
  }
  return this.save();
};

// Instance method to remove a friend
UserSchema.methods.removeFriend = function (friendId) {
  this.friends.pull(friendId);
  return this.save();
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
