const Product = require("../models/Product");
const createProduct = async (req, res) => {
    const { name, description, price, image, category, countInStock } = req.body;
    if (!name || !description || !price || !category) {
    return res.status(400).json({
        message: "Please provide all required fields",
    });
    }
    const product = await Product.create({
    name,
    description,
    price,
    image,
    category,
    countInStock,
    });
    return res.status(201).json({
    message: "Product created successfully",
    product,
    });
};
const getProducts = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json(products);
};
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
    return res.status(404).json({
        message: "Product not found",
    });
    }
    return res.status(200).json(product);
};
const updateProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
    return res.status(404).json({
        message: "Product not found",
    });
    }
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;
    await product.save();
    return res.status(200).json({
    message: "Product updated successfully",
    product,
    });
};
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
    return res.status(404).json({
        message: "Product not found",
    });
    }
    await product.deleteOne();
    return res.status(200).json({
    message: "Product deleted successfully",
    });
};
module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};