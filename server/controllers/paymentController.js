const asyncHandler = require("express-async-handler");
const razorpay = require("../config/razorpay");
const Order = require("../models/Order");
const crypto = require("crypto");
const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
    res.status(404);
    throw new Error("Order not found");
    }
    const options = {
  amount: order.totalPrice * 100,
  currency: "INR",
  receipt: order._id.toString(),
    };

    const razorpayOrder = await razorpay.orders.create(options);
    res.status(200).json({
    success: true,
    razorpayOrder,
    });
});
const verifyPayment = asyncHandler(async (req, res) => {
  const {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  orderId,
  } = req.body;
  const generatedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  .digest("hex");
  if (generatedSignature !== razorpay_signature) {
  res.status(400);
  throw new Error("Invalid payment signature");
  }
  const order = await Order.findById(orderId);

if (!order) {
  res.status(404);
  throw new Error("Order not found");
}

if (order.isPaid) {
  res.status(400);
  throw new Error("Order is already paid");
}

order.isPaid = true;
order.paidAt = Date.now();
order.paymentId = razorpay_payment_id;

await order.save();
  res.status(200).json({
  success: true,
  message: "Payment verified successfully",
  order,
  });
});
module.exports = {
  createRazorpayOrder,
  verifyPayment,
};