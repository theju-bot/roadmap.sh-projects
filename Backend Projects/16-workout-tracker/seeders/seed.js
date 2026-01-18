const mongoose = require("mongoose");
require("dotenv").config();
const Exercise = require("../model/ExercisesWT");

const seedUserAndExercise = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to MongoDB");
    await Exercise.deleteMany({});

    const execrcises = await Exercise.create([
      {
        name: "Barbell Bench Press",
        description: "Horizontal push - targets chest, triceps and front delts",
        category: "Chest",
      },
      {
        name: "Back Squat",
        description: "Main lower body compound lift",
        category: "Legs",
      },
      {
        name: "Conventional Deadlift",
        description: "Posterior chain powerhouse movement",
        category: "Back",
      },
      {
        name: "Pull-ups / Chin-ups",
        description: "Vertical pulling exercise for lats and biceps",
        category: "Back",
      },
      {
        name: "Overhead Press (Standing)",
        description: "Main shoulder pressing movement",
        category: "Shoulders",
      },
      {
        name: "Romanian Deadlift",
        description: "Hamstring and glute focused hinge",
        category: "Hamstrings",
      },
      {
        name: "Bent Over Barbell Row",
        description: "Horizontal pull for upper back thickness",
        category: "Back",
      },
      {
        name: "Dumbbell Lateral Raise",
        description: "Isolation for side delts",
        category: "Shoulders",
      },
      {
        name: "Treadmill / Outdoor Running",
        description: "Classic cardio for endurance",
        category: "Cardio",
      },
      {
        name: "Plank (various variations)",
        description: "Core stability isometric exercise",
        category: "Core",
      },
      {
        name: "Dumbbell Bulgarian Split Squat",
        description: "Unilateral leg exercise - great for balance",
        category: "Legs",
      },
      {
        name: "Face Pulls",
        description: "Rear delts & upper back health exercise",
        category: "Rear Delts",
      },
    ]);

    console.log(`${execrcises.length} Exercises Seeded Successfully`);
  } catch (err) {
    console.log("Seeding Failed", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

seedUserAndExercise();