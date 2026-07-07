const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

// Add product to cart
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Check if product already exists in cart
    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

  if (cartItem) {
    const newQuantity = cartItem.quantity + (quantity ?? 1);

    if (newQuantity > product.countInStock) {
      res.status(400);
      throw new Error("Cannot add more than available stock");
    }

    cartItem.quantity = newQuantity;
    await cartItem.save();

    return res.status(200).json({
      message: "Cart updated successfully",
      cartItem,
    });
  }
    const requestedQuantity = quantity ?? 1;

    if (requestedQuantity > product.countInStock) {
      res.status(400);
      throw new Error("Cannot add more than available stock");
    }
    // Create new cart item
    cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity: quantity ?? 1,
    });

    res.status(201).json({
      message: "Product added to cart",
      cartItem,
    });
});
// Get logged-in user's cart
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.find({ user: req.user._id }).populate("product");

    res.status(200).json(cart);
});
// Update cart item quantity
const updateCart = asyncHandler(async (req, res) => {
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
    _id: req.params.id,
    user: req.user._id,
    });

    if (!cartItem) {
      res.status(404);
      throw new Error("Cart item not found");
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cartItem,
    });
});
// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      res.status(404);
      throw new Error("Cart item not found");
    }

    await cartItem.deleteOne();

    res.status(200).json({
      message: "Item removed from cart",
    });
});
module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};