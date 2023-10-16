
// Models
const Seller = require("../../models/sellerModel")
const formidable = require("formidable")
// utils 
const returnResponse = require("../../utils/response")
const imageUpload = require("../../services/image-upload")

class UserController {
    // Uploading seller profile image into database
    async profileImageUpload(req, res) {
        const { userId} = req.params
        const form = formidable()
        form.parse(req, async(err, _, files) => {
            try {
                const userImage = await imageUpload.upload(files.userImage, "users")
                const seller = await Seller.findByIdAndUpdate(userId, {
                    image:userImage
                })

                if(!seller){
                    return returnResponse(res, 400, {
                        message:"Filed to upload profile image"
                    })
                }

                return returnResponse(res, 200, {
                    message:"Profile image upload successfully"
                })

            } catch (error) {
                returnResponse(res, 500, {
                    message: error.message
                })
            }
        })
    }
    // Uploading seller shop info into database
    async sellerShopInfoUpload(req, res){
        const {userId}=req.params
        console.log(userId)
        const form = formidable()
        form.parse(req, async(err, fields) => {
            if(err){
                return returnResponse(res,500, {
                    message:err.message
                })
            }
            try {
                const user = await Seller.findOneAndUpdate({_id:userId},{shopInfo:fields})
                if(!user){
                    return returnResponse(res, 500, {
                        message:"Failed to upload shop info"
                    })
                }
                const userInfo = await Seller.findById(userId).select("shopInfo")
                returnResponse(res, 201, {
                    message:"Shop info uploaded successfully",
                    shopInfo:userInfo.shopInfo
                })
            } catch (error) {
                console.log(error)
                returnResponse(res, 500, {
                    message:error.message
                })
            }
        })
       
    }
}


module.exports = new UserController()