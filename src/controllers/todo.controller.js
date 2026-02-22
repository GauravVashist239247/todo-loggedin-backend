import { Todo } from "../models/todo.models.js";

/*
========================================
CREATE TODO
========================================
*/
export const createTodo = async (req, res) => {
  try {
    const { title, content, duedate } = req.body;
    console.log(req.user);

    const todo = await Todo.create({
      title,
      content,
      completed,
      duedate,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
GET ALL TODOS (Only Logged In User)
========================================
*/
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
GET SINGLE TODO (Only Owner)
========================================
*/
export const getSingleTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
UPDATE TODO (Only Owner)
========================================
*/
export const updateTodo = async (req, res) => {
  try {
    const { title, content, completed, duedate } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content, completed, duedate },
      { new: true },
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
DELETE TODO (Only Owner)
========================================
*/
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
TOGGLE COMPLETE
========================================
*/
export const toggleComplete = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
