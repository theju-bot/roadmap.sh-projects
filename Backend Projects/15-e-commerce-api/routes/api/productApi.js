const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../../controllers/productController");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyAdmin = require("../../middleware/verifyAdmin");

router
  .route("/")
  .get(verifyJWT, getProducts)
  .post(verifyJWT, verifyAdmin, createProduct);

router
  .route("/:id")
  .get(verifyJWT, getProductById)
  .put(verifyJWT, verifyAdmin, updateProduct)
  .delete(verifyJWT, verifyAdmin, deleteProduct);

module.exports = router;
