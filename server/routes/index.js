const router = require("express").Router()
const adminRoute = require("./adminRoutes")

router.use("/api/admin", adminRoute)

module.exports = router