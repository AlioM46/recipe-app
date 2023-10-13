const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/auth.js");
const recipesRouter = require("./routes/recipes.js");

// === = = = = =  = = =

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hjcqefb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((res) => {
    console.log(`CONNECTED SUCCESSFULLY.`);
  })
  .catch((err) => {
    console.log("CONNECTED IS FAILED");
  });

app.listen(5000, (req, res) => {
  console.log("SERVER IS RUNNING");
});
