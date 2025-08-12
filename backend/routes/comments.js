// backend/routes/comments.js
import express from "express";
import { addCommentHandler, getCommentsHandler } from "../controllers/commentsController.js";

const router = express.Router();

router.post("/:photoId", addCommentHandler);
router.get("/:photoId", getCommentsHandler);

export default router;

