const router = require("express").Router()
const authController = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/seller/register", authController.seller_register)
router.post("/seller/login", authController.seller_login)
router.get("/get-user", authMiddleware.authenticate, authController.getUser)
// router.get("/seller/register", authController.seller_register)


module.exports=router 