const router = require("express").Router()
const authController = require("../controllers/authController")

router.post("/seller/register", authController.seller_register)
router.get("/seller/register", authController.seller_register)


module.exports=router 