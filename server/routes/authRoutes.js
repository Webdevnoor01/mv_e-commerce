const router = require("express").Router()
const authController = require("../controllers/authController")

router.post("/seller/register", (req, res) => {
    res.status(201).json({
        message:'its working'
    })
})
router.get("/seller/register", authController.seller_register)


module.exports=router 