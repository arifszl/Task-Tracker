import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRouter from "./router/task.js";

import bodyParser from "body-parser";
const app = express();

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  }),
);
app.use("/", taskRouter);

mongoose
  .connect("mongodb://0.0.0.0:27017/taskDb")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8000, () => {
  console.log("listening at 8000");
});
