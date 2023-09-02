import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
//adding a new field to the schema for tasks belonging to a user

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// statics is used to create a method on the model
//create static signup method

userSchema.statics.signup = async function (email, password) {
  console.log("inside signup");

  //validaation

  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  //   if (!validator.isEmail(email)) {
  //     throw new Error("Invalid Email");
  //   }

  //   if (!validator.isStrongPassword(password)) {
  //     throw new Error("Password is not strong enough");
  //   }

  const existingUser = await this.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });
  return user;
};

//stsatic method to login

userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Email or Password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email or Password is incorrect");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
