import express from "express";
import {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
} from "../controllers/todo.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyAuth, createTodo);
router.get("/", verifyAuth, getTodos);
router.get("/:id", verifyAuth, getSingleTodo);
router.patch("/:id", verifyAuth, updateTodo);
router.delete("/:id", verifyAuth, deleteTodo);
router.patch("/:id/toggle", verifyAuth, toggleComplete);

export default router;
