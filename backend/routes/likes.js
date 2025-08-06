import express from "express";
import { likePhoto, getLikes } from "../controllers/likesController.js";

const router = express.Router();
router.post("/:photoId", likePhoto);
router.get("/:photoId", getLikes);

export default router;
