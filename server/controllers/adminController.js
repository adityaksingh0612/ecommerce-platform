const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  const revenue = await Order.aggregate([
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$totalPrice" },
    },
  },
]);

const totalRevenue =
  revenue.length > 0 ? revenue[0].totalRevenue : 0;

  res.status(200).json({
    success: true,
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue,
  });
});
module.exports = {
  getDashboardStats,
};