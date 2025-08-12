import express from "express";
import { trackClick } from "../controllers/socialController.js";

const router = express.Router();

router.post("/:platform", trackClick);

export default router;
