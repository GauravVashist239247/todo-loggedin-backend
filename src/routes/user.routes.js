import express from "express";

// ../ means "Go up to src", then go into "controllers" or "middleware"
import { register, login } from "../controllers/authuser.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyAuth, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
