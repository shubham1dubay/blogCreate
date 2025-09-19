const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./router/authRoutes");
const blogRoutes = require("./router/blogRoutes");
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/blog", blogRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.log(err));
