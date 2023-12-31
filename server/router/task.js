import express from "express";
import Task from "../model/task.js";
import isLoggedin from "../middleware/isLoggedin.js";

const router = express.Router();
//create search route with query params

router.get("/search/:title", isLoggedin, async (req, res) => {
  const user_id = req.user._id;
  let titleSearch = req.params.title;

  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(titleSearch);
  const tasks = await Task.find({
    $or: [{ title: { $regex: searchRgx, $options: "i" } }],
    user_id,
  });

  res.status(200).json(tasks);
});

router.get("/sort/:sort", isLoggedin, async (req, res) => {
  const user_id = req.user._id;
  let sort = req.params.sort;

  if (sort === "Date") {
    const tasks = await Task.find({ user_id }).sort({ date: 1 });

    res.status(200).json(tasks);
  } else if (sort === "Priority") {
    const tasks = await Task.find({ user_id }).sort({ priority: 1 });
    res.status(200).json(tasks);
  } else if (sort === "Status") {
    const tasks = await Task.find({ user_id }).sort({ status: 1 });
    res.status(200).json(tasks);
  }
});

router.post("/addtask", isLoggedin, async (req, res) => {
  let { title, date, priority, description } = req.body;

  const taskpost = new Task({
    title: title,
    date: date,
    priority: priority,
    description: description,
    user_id: req.user._id,
  });
  await taskpost.save();
  res.status(200).json({ message: "Task added to database" });
});

router.get("/gettasks", isLoggedin, async (req, res) => {
  const user_id = req.user._id;
  let tasks = await Task.find({ user_id });
  res.status(200).json(tasks);
});
//get particular task details from backend and set it modal

router.get("/gettask/:id", isLoggedin, async (req, res) => {
  let id = req.params.id;

  const task = await Task.findById(id);

  res.status(200).json(task);
});

router.put("/updatetask/:id", isLoggedin, async (req, res) => {
  let id = req.params.id;

  let { title, date, status, description } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      title: title,
      date: date,
      status: status,
      description: description,
    },
  );
  res.status(200).json({ message: "Task updated" });
});

router.delete("/deletetask/:id", isLoggedin, async (req, res) => {
  let id = req.params.id;

  await Task.findByIdAndDelete(id);
  res.status(200).json({ message: "Task deleted" });
});

export default router;
