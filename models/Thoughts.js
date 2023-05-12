const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");

const ReactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).format("MMMM Do YYYY, h:mm:ss a"),
  },
});

const ThoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format("MMMM Do YYYY, h:mm:ss a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get count of reactions on retrieval
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", ThoughtSchema);

module.exports = Thought;
