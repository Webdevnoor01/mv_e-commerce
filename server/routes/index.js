const router = require("express").Router()
const adminRoute = require("./adminRoutes")
const authRoute = require("./authRoutes")

router.use("/api/admin", adminRoute)
router.use("/api/auth",authRoute )

module.exports = router