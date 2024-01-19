const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
const validator = require("validator");
const { CustomErrorHandler } = require("../middleware/errorHandlerMiddleware");

//Get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const Workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(Workouts);
};

//Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  //checking the id type

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const user_id = req.user._id;
  const { title, load, reps, timeToStart } = req.body;

  if (validator.isEmpty(title.trim())) {
    throw new CustomErrorHandler(400, "Please provide the workout title");
  }
  //add document to db
  if (validator.isEmpty(load.trim())) {
    throw new CustomErrorHandler(400, "Please provide the load");
  }

  if (validator.isEmpty(reps.trim())) {
    throw new CustomErrorHandler(400, "Please provide the reps");
  }

  const workout = await Workout.create({
    title,
    load,
    reps,
    timeToStart,
    user_id,
  });
  res.status(200).json(workout);
};

//delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  // check validation

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  //delete the item
  const workout = await Workout.findOneAndDelete({ _id: id });

  //validity check for workouts

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  // check validation

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    {
      new: true,
    }
  );
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
