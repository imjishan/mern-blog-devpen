import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("mongo db is connected");
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("server is running on port: 3000");
});
// localhost:3000/api/user + /test
// /test comes from the user.routes.js
// and to simplify the code and not to get messy we have created a file (controllers)
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
