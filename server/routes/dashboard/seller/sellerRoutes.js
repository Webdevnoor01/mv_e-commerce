const router = require("express").Router()

// Middleware
const authMiddleware = require("../../../middlewares/authMiddleware")

// controller
const productController = require("../../../controllers/dashboard/seller/productController")

// routes


// routes for product (CRUD)
router.post("/product-add", authMiddleware.authenticate, productController.addProduct)
router.get("/products-get", authMiddleware.authenticate, productController.getProduct)

router.get('/product-get/:productId', authMiddleware.authenticate, productController.getProductById)


router.patch("/product-update/:productId", authMiddleware.authenticate, productController.updateProduct)
router.patch("/product-update-img/:productId", authMiddleware.authenticate, productController.updateProductImage)

// TODO: pending
router.delete("/product-delete/:productId", authMiddleware.authenticate, productController.deleteProduct)

module.exports = router