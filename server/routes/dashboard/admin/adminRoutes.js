const router = require("express").Router()

// Middleware
const authMiddleware = require("../../../middlewares/authMiddleware")

// controller
const adminController = require("../../../controllers/dashboard/admin/adminController")

// routes

// routes for get pending, active, deactive seller
router.get("/seller-requests-get", authMiddleware.authenticate, adminController.getSellerRequests)
router.patch("/seller-status-update", authMiddleware.authenticate, adminController.updateSellerStatus)


// routes for category (CRUD)
router.post("/category-add", authMiddleware.authenticate, adminController.addCategory)
router.get("/category-get", authMiddleware.authenticate, adminController.getCategory)

module.exports = router