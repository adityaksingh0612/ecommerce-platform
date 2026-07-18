const Order = require("../models/Order");
const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");

// Place Order
const placeOrder = asyncHandler(async (req, res) => {
    // Get user's cart
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");
    // Check stock availability
    for (const item of cartItems) {
      if (item.quantity > item.product.countInStock) {
        res.status(400);
        throw new Error(
          `${item.product.name} has only ${item.product.countInStock} items in stock`
        );
      }
    }

    // Check if cart is empty
    if (cartItems.length === 0) {
      res.status(400);
      throw new Error("Cart is empty");
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    // Prepare order items
    const orderItems = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
});
// Get logged-in user's orders
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({
      user: req.user._id,
      isPaid: true,
    }).populate("orderItems.product");

    res.status(200).json(orders);
});
// Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("orderItems.product");

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    res.status(200).json(order);
});

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
};