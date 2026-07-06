const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Ecommerce Backend is Running...");
});

// Error Middleware (Must be after all routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
console.log("NODE_ENV =", process.env.NODE_ENV);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});