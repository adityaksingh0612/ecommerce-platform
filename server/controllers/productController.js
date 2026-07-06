const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, countInStock } = req.body;
  const image = req.file ? req.file.path : "";

  const product = await Product.create({
    name,
    description,
    price,
    image,
    category,
    countInStock,
  });

  res.status(201).json({
    message: "Product created successfully",
    product,
  });
});

// Get All Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// Get Product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = req.body.name ?? product.name;
  product.description = req.body.description ?? product.description;
  product.price = req.body.price ?? product.price;
  product.image = req.body.image ?? product.image;
  product.category = req.body.category ?? product.category;
  product.countInStock =
    req.body.countInStock ?? product.countInStock;

  await product.save();

  res.status(200).json({
    message: "Product updated successfully",
    product,
  });
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.status(200).json({
    message: "Product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};