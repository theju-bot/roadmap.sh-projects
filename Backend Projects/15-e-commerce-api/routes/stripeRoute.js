const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/stripeController");
const {
  paymentSuccess,
  paymentCancel,
} = require("../controllers/frontEndController");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/checkout", verifyJWT, createCheckoutSession);
router.get("/success", paymentSuccess);
router.get("/cancel", paymentCancel);

module.exports = router;
