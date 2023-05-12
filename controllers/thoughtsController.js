const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // add thought to user's thoughts array
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } },
        { new: true, runValidators: true }
      );

      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought by its `_id`
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought by its `_id`
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }

      // remove thought from user's thoughts array
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } },
        { new: true, runValidators: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      console.log("Request body: ", req.body);
      console.log("Request params: ", req.params);

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }

      res.json(thought);
    } catch (err) {
      console.error("Error occurred while adding a reaction: ", err);
      res.status(500).json(err);
    }
  },

  // Remove a reaction
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } }, // Use _id instead of reactionId
        { new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
