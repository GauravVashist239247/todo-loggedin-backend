import mongoose from "mongoose";

const { Schema, model } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    content: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    duedate: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // change if your user model name is different
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Todo = model("Todo", todoSchema);
