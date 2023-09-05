import express from "express";
const userRouter = express.Router();
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import isLoggedin from "../middleware/isLoggedin.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  //  res.json({ message: "Register successful!" });
});

export default userRouter;
