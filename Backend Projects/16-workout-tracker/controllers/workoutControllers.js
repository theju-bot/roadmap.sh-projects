const ExercisesWT = require("../model/ExercisesWT");
const WorkOutWT = require("../model/WorkOutWT");

const createUserWorkout = async (req, res, next) => {
  try {
    const { exercises, date, comments } = req.body;
    const userId = req.user._id;

    if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one exercise is required" });
    }

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    for (const ex of exercises) {
      if (!ex.exercise || !ex.sets || !ex.reps || !ex.weight) {
        return res.status(400).json({
          message: "Each Exercise must have exercise, sets. reps and weights",
        });
      }
      const doesExerciseExist = await ExercisesWT.findById(ex.exercise).exec();
      if (!doesExerciseExist) {
        return res
          .status(400)
          .json({ message: `Exercise with id ${ex.exercise} does not exist` });
      }
    }

    const newWorkout = await WorkOutWT.create({
      user: userId,
      exercises,
      date,
      comments: comments || "",
    }).exec();

    const populatedWorkout = await WorkOutWT.findById(newWorkout._id)
      .populate({
        path: "exercises.exercise",
        select: "name description category",
      })
      .populate("user", "userName")
      .exec();

    res.status(201).json({
      message: "Workout created successfully",
      workout: populatedWorkout,
    });
  } catch (err) {
    next(err);
  }
};

const viewUserWorkOut = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const workouts = await WorkOutWT.find({ user: userId })
      .populate({
        path: "exercises.exercise",
        select: "name description category",
        model: "ExercisesWT",
      })
      .populate({
        path: "user",
        select: "userName",
        model: "UsersWT",
      })
      .exec();
    res.status(200).json({ workouts });
  } catch (err) {
    next(err);
  }
};

const editUserWorkOut = async (req, res, next) => {
  try {
    let { id, exercises, date, comments } = req.body;
    const userId = req.user._id;

    if (!id) {
      return res.status(400).json({ message: "Workout id is required" });
    }

    const workout = await WorkOutWT.findById(id).exec();

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
      exercises = workout.exercises;
    } else {
      for (const ex of exercises) {
        if (!ex.exercise || !ex.sets || !ex.reps || !ex.weight) {
          return res.status(400).json({
            message: "Each Exercise must have exercise, sets. reps and weights",
          });
        }

        const doesExerciseExist = await ExercisesWT.findById(
          ex.exercise,
        ).exec();

        if (!doesExerciseExist) {
          return res.status(400).json({
            message: `Exercise with id ${ex.exercise} does not exist`,
          });
        }
      }
    }

    if (!date) {
      date = workout.date;
    }

    if (!comments) {
      comments = workout.comments;
    }

    const updatedWorkout = await WorkOutWT.findByIdAndUpdate(
      id,
      {
        exercises,
        date,
        comments: comments || "",
      },
      { new: true, runValidators: true },
    )
      .populate({
        path: "exercises.exercise",
        select: "name description category",
      })
      .populate("user", "userName")
      .exec();

    res.status(200).json({
      message: "Workout updated successfully",
      workout: updatedWorkout,
    });
  } catch (err) {
    next(err);
  }
};

const delteUserWorkOut = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Workout id is required" });
    }

    const workout = await WorkOutWT.findById(id).exec();

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await WorkOutWT.findByIdAndDelete(id).exec();

    res
      .status(200)
      .json({ message: "Workout deleted successfully", deletedId: id });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUserWorkout,
  viewUserWorkOut,
  editUserWorkOut,
  delteUserWorkOut,
};
