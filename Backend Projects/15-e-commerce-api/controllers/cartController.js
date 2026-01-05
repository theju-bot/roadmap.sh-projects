const Cart = require("../model/Cart");

const addProductToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    if (!productId || typeof quantity !== "number" || quantity < 1) {
      return res
        .status(400)
        .json({ message: "userId, productId and valid quantity are required" });
    }
    const userCart = await Cart.findOne({ userId }).exec();
    if (!userCart) {
      userCart = await Cart.create({
        userId,
        products: [],
      });
    }

    const productIndex = userCart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      userCart.products[productIndex].quantity += quantity;
    } else {
      userCart.products.push({ productId, quantity });
    }
    await userCart.save();
    return res
      .status(200)
      .json({ message: "Product added to cart successfully", cart: userCart });
  } catch (err) {
    next(err);
  }
};

const removeProductFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const userCart = await Cart.findOne({ userId }).exec();
    if (!userCart) {
      return res
        .status(404)
        .json({ message: "Not found the Cart for the user" });
    }

    const productIndex = userCart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      userCart.products.splice(productIndex, 1);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    await userCart.save();
    return res.status(200).json({
      message: "Product removed from cart successfully",
      cart: userCart,
    });
  } catch (err) {
    next(err);
  }
};

const getCartByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id;

    let userCart = await Cart.findOne({ userId })
      .populate("products.productId")
      .exec();
    // If cart does not exist, create an empty one
    if (!userCart) {
      userCart = {
        products: [],
      };
    }
    return res.render("cart", {
      cart: userCart,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addProductToCart, removeProductFromCart, getCartByUserId };
