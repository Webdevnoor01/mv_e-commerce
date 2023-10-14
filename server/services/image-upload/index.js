const cloudinary = require("../../config/cloudinaryConfig")

class ImageUpload {

    // upload image inot cloudinary coude

    /**
     * 
     * @param {Object} file Thsi file object contain the new image file
     * @param {String} folder Enter the folder name where you wants to store the image
     * @returns {Object} It will return an object which contain image url, and public id.
     */
    async upload(file, folder){
        try {
            
            const result = await cloudinary.uploader.upload(file.filepath, {
                folder
            })

            console.log("result ", result)
            return {
                url:result.url,
                publicId:result.public_id
            }
        } catch (error) {
            console.log("imageUploade service error: ", error)
            return error.message
        }
    }

    async remove(publicId){
        try {
            const result = await cloudinary.uploader.destroy(publicId, (result) => {
                console.log("remove image: ", result)
            })

            return true;
        } catch (error) {
            return error.message;
        }
    }


}


module.exports = new ImageUpload()