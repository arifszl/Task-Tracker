import express from "express";
import Task from "../model/task.js";

const router = express.Router();

router.post("/addtask", async (req, res) => {
  let { title, date, priority, description } = req.body;

  const taskpost = new Task({
    title: task,
    date: date,
    priority: priority,
    description: description,
  });
  await taskpost.save();
  res.status(200).json({ message: "Task added to database" });
});

router.get("/gettasks", async (req, res) => {
  let tasks = await Task.find();
  res.status(200).json(tasks);
});

export default router;
