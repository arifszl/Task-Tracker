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
  },
  priority: {
    type: String,
    enum: ["1", "2", "3"],
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
