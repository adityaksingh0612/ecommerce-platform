const express = require("express");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { validateProduct } = require("../validators/productValidator");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.route("/")
    .post(
        protect,
        admin,
        upload.single("image"),
        validateProduct,
        createProduct
    )
    .get(getProducts);

router.route("/:id")
    .get(getProductById)
    .put(protect, admin, validateProduct, updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;