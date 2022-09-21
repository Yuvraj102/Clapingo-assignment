const express = require("express");

const app = express();
const errorHandler = require("./utils/errorHandler");
const authRouter = require("./route/authRoute");
const featureRouter = require("./route/featureRoute");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

// db connection
mongoose.connect("mongodb://localhost:27017/assignment", (err) => {
  if (!err) console.log("db connected successfully");
  else console.log(`err connecting db ${err}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/feature", featureRouter);
app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on ${process.env.PORT || 3000}`);
});
