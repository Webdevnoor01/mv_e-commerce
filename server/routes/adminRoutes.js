const router = require("express").Router()

// Middleware
const authMiddleware = require("../middlewares/authMiddleware")

// controller
const authController = require("../controllers/authController")

// routes
router.post("/login",authController.admin_login)
router.get("/get-user", authMiddleware.authenticate, authController.getUser)

module.exports = router