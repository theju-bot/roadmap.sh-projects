const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exercisesWTSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExercisesWT", exercisesWTSchema);