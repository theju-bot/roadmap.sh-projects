const express = require("express");
const verifyJWT = require("../../middleware/verifyJWT");
const router = express.Router();
const {
  createUserWorkout,
  viewUserWorkOut,
  editUserWorkOut,
  delteUserWorkOut,
} = require("../../controllers/workoutControllers");

router
  .route("/")
  .get(verifyJWT, viewUserWorkOut)
  .post(verifyJWT, createUserWorkout)
  .put(verifyJWT, editUserWorkOut);

router.route("/:id").delete(verifyJWT, delteUserWorkOut);
module.exports = router;
