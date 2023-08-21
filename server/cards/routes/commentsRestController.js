

const express = require("express");
const router = express.Router();
const auth = require("../../auth/authService");
const commentsModel = require("../models/mongodb/Comment");


router.get("/:cardId", auth, async (req, res) => {
  const { cardId } = req.params;
  try {
    const cardComments = await commentsModel.find({ cardId: cardId });
    return res.status(200).send(cardComments);
  } catch (error) {
    console.error("Error getting comments:", error);
    return res.status(500).send({ error: "Failed to get comments" });
  }
}); 

// Save comment for a specific card
router.post("/:userId/:cardId", auth, async (req, res) => {
  const { userId, cardId } = req.params;
  const { content } = req.body;
  try {
    const newComment = new commentsModel({
      cardId: cardId,
      userId: userId,
      content: content,
    });
    await newComment.save();
    return res.status(201).send(newComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    return res.status(500).send({ error: "Failed to save comment" });
  }
});



// Delete comment by Id
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await commentsModel.deleteOne({ _id: id });

    if (!deletedComment) {
      return res.status(404).send({ error: "Comment not found" });
    }

    return res.status(200).send(deletedComment);
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).send({ error: "Failed to delete comment" });
  }
});

// Update comment by Id
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await commentsModel.findOneAndUpdate(
      { _id: id },
      { content: content }
    );
    if (!updatedComment) {
      return res.status(404).send({ error: "Comment not found" });
    }
    return res.status(200).send(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).send({ error: "Failed to update comment" });
  }
});



module.exports = router;
