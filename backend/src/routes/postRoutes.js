import express from "express";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { createPost, getAllPosts } from "../controllers/postController.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createPost);
router.get("/", protect, getAllPosts);

export default router;
