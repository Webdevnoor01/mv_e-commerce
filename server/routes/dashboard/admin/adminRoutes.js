const router = require("express").Router()

// Middleware
const authMiddleware = require("../../../middlewares/authMiddleware")

// controller
const adminController = require("../../../controllers/dashboard/admin/adminController")

// routes

// routes for get pending, active, deactive seller
router.get("/active-sellers-get", authMiddleware.authenticate, adminController.getActiveSellers)
router.get("/active-seller-get/:sellerId", authMiddleware.authenticate, adminController.getSeller)
router.get("/inactive-sellers-get", authMiddleware.authenticate, adminController.getInactiveSellers)
router.get("/inactive-seller-get/:sellerId", authMiddleware.authenticate, adminController.getSeller)
router.patch("/seller-status-update", authMiddleware.authenticate, adminController.updateSellerStatus)


// routes for category (CRUD)
router.post("/category-add", authMiddleware.authenticate, adminController.addCategory)
router.get("/category-get", authMiddleware.authenticate, adminController.getCategory)

module.exports = router