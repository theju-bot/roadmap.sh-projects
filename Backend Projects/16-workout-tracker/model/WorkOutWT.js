const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseInWorkoutWTSchema = new Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExercisesWT",
      required: true,
    },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
  },
  { timestamps: true }
);

const workOutWTSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersWT",
      required: true,
    },
    exercises: [exerciseInWorkoutWTSchema],
    date: { type: Date, required: true },
    comments: {type: String, default: ""},
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkOutWT", workOutWTSchema);