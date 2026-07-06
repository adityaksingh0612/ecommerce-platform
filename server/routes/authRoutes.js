const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/profile", protect, (req, res) => {
    res.status(200).json(req.user);
});
module.exports = router;