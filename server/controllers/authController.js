const User = require("../models/User");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
    return res.status(400).json({
        message: "Please provide all fields",
    });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
    return res.status(400).json({
        message: "User already exists",
    });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
    name,
    email,
    password: hashedPassword,
    });
    return res.status(201).json({
    message: "User registered successfully",
    user,
    });
};
module.exports = {
    registerUser,
};