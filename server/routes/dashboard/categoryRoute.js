const router = require("express").Router()

// Middleware
const authMiddleware = require("../../middlewares/authMiddleware")

// controller
const categoryController = require("../../controllers/dashboard/categoryController")

// routes


// routes for category (CRUD)
router.post("/category-add", authMiddleware.authenticate, categoryController.addCategory)
router.get("/category-get", authMiddleware.authenticate, categoryController.getCategory)

module.exports = router