const express = require('express');
const router = express.Router();
const { addProductToCart, removeProductFromCart, getCartByUserId } = require('../../controllers/cartController');
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, getCartByUserId)
    .post(verifyJWT, addProductToCart)
    .delete(verifyJWT, removeProductFromCart);

module.exports = router