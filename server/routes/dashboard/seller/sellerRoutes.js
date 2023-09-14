const router = require("express").Router()

// Middleware
const authMiddleware = require("../../../middlewares/authMiddleware")

// controller
const productController = require("../../../controllers/dashboard/seller/productController")

// routes


// routes for category (CRUD)
router.post("/product-add", authMiddleware.authenticate, productController.addProduct)
router.get("/product-get", authMiddleware.authenticate, productController.getProduct)

module.exports = router