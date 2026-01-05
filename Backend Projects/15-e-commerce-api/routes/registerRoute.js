const express = require("express");
const router = express.Router();
const {
  registerUser,
  deleteUser,
  showUsers,
} = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdmin = require("../middleware/verifyAdmin");

router
  .route("/")
  .post(registerUser)
  .get(verifyJWT, verifyAdmin, showUsers)
  .delete(verifyJWT, verifyAdmin, deleteUser);

module.exports = router;
