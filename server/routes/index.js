const router = require("express").Router()

// imported routes
const adminAuthRoute = require("./adminRoutes")
const authRoute = require("./authRoutes")
const adminRoute = require("./dashboard/admin/category")

// route for authentication
router.use("/api/auth",authRoute )

// route for admin (This below route will be used for admin login)
router.use("/api/auth/admin", adminAuthRoute)

// admin routes
router.use("/api/admin",adminRoute )

module.exports = router