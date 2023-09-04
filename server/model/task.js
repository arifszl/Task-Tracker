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
    enum: ["1", "2", "3"],
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
