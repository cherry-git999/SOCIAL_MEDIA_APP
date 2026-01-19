import express from "express";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Test protected route
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

export default router;
