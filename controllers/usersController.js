const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("thoughts friends");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.id).populate(
        "thoughts friends"
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user by its `_id`
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user by its `_id`
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friends list
  async addFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }
      await user.addFriend(req.params.friendId);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friends list
  async removeFriend(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }
      await user.removeFriend(req.params.friendId);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
