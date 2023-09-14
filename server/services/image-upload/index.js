const cloudinary = require("../../config/cloudinaryConfig")

class ImageUpload {
    async upload(file, folder){
        try {
            
            const result = await cloudinary.uploader.upload(file.filepath, {
                folder
            })
            return result.url
        } catch (error) {
            console.log("imageUploade service error: ", error)
            return error.message
        }
    }
}


module.exports = new ImageUpload()