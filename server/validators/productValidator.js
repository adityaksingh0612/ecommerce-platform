const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("countInStock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative"),

  (req, res, next) => {
    const errors = validationResult(req);

    return res.status(400).json({
  success: false,
  message: "Validation failed",
  errors: errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
    })),
    });

    next();
  },
];

module.exports = {
  validateProduct,
};