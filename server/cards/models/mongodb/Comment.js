
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "card",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentsModel = mongoose.model("comments", commentSchema);

module.exports = commentsModel;

