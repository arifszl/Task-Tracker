import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRouter from "./router/task.js";
import userRouter from "./router/user.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  }),
);

app.use(taskRouter);
app.use(userRouter);

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
