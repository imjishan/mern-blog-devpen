import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (request, response, next) => {
  const { username, email, password } = request.body;

  //validate user info
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!!"));
  }

  //   hashing and salting password
  const hashPassword = bcryptjs.hashSync(password, 10);
  //creating user using "User" model
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    response.json("signup successful");
  } catch (error) {
    next(error);
  }
};
