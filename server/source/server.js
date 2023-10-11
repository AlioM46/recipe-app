const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userAuth.js");
const RecipeRouter = require("./routes/RecipesRoute.js");
require("dotenv").config();
//
// ==============================================================================

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed HTTP methods
  // allowedHeaders: "Content-Type,Authorization", // Specify allowed headerss
};

const app = express();
//
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", userRouter);
app.use("/recipes", RecipeRouter);

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${db_user}:${db_password}@cluster0.hjupt7z.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((res) => {
    console.log("CONNECTED IS SUCCESSFULLY.");
  })
  .catch((err) => {
    console.log("CONNECTED IS FAILED.");
  });

app.listen(5000, () => {
  console.log("SERVER IS RUNNING.");
});
