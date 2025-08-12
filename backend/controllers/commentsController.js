// backend/controllers/commentsController.js
import { addComment, fetchComments } from "../models/commentsModel.js";

export async function addCommentHandler(req, res) {
  const { photoId } = req.params;
  const { text } = req.body;
  try {
    await addComment(photoId, text);
    res.json({ message: "Comment added!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCommentsHandler(req, res) {
  const { photoId } = req.params;
  try {
    const comments = await fetchComments(photoId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


