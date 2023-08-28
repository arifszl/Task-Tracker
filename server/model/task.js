import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  date: Date,
  status: {
    type: String,
    enum: ["Completed", "Pending", "In Progress"],
    default: "Pending",
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
