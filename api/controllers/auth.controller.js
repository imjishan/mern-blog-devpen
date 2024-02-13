import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (request, response) => {
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
    return response.status(400).json({ message: "All fields are required" });
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
    response.status(500).json({ message: error.message });
  }
};
