const express = require("express");
const router = express.Router();
const { showUsers, deleteUser } = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdmin = require("../middleware/verifyAdmin");

router
  .route("/")
  .get(verifyJWT, verifyAdmin, showUsers)

router
  .route("/:id")
  .delete(verifyJWT, verifyAdmin, deleteUser);

module.exports = router;
