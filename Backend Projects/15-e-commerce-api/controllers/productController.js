const Product = require("../model/Product");

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;
    if (
      !name ||
      !description ||
      typeof price !== "number" ||
      typeof stock !== "number" ||
      !imageUrl
    ) {
      return res.status(400).json({
        message: "name, description, price, stock and imageUrl are required",
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl,
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().exec();
    /* const user = req.user;
    if (req.user && req.user.isAdmin) {
      req.products = products;
      return next(); 
    } */
    /*  return res.status(200).json({ products }); */
    if (req.user && req.user.isAdmin) {
      return res.render("admin/products", { products, user: req.user });
    };
    return res.render("products", { products, user: req.user });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).exec();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl } = req.body;
    if (
      !name ||
      !description ||
      typeof price !== "number" ||
      typeof stock !== "number" ||
      !imageUrl
    ) {
      return res.status(400).json({
        message: "name, description, price, stock and imageUrl are required",
      });
    }

    const oldProduct = await Product.findById(id).exec();
    if (!oldProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        stock,
      },
      { new: true }
    ).exec();

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeleted = await Product.findByIdAndDelete(id).exec();
    if (isDeleted) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
