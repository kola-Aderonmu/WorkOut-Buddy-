require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { errorHandler } = require("./middleware/errorHandlerMiddleware");
//Express app

const app = express();

const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors()); //Fix the cross origin error

const allowedOrigins = [
  "https://work-out-buddy-seven.vercel.app",
  "http://localhost:5173",
];
// middleware
app.use(function (req, res, next) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use((req, res, next) => {
  console.log(req.path, req.method, req.url);
  next();
});

// Route handler

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// app.get("/", (req, res) => {
//   res.json({ mssg: "Welcome to the app" });
// });

//Listen for request_access the Port

app.use(errorHandler);

//Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Listening for request
    app.listen(PORT, () => {
      console.log(`Connected to Db, Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
