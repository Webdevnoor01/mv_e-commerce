// form data parser
const formidable = require("formidable")

// models
const Category  = require("../../models/admin/categoryModel")

// services
const imageUploader = require("../../services/image-upload")

// utils
const returnResponse = require("../../utils/response")

class CategoryController {

    async addCategory(req, res){
        try {
            const form =  formidable()
            form.parse(req, async (err, fields, files) => {
                if(err) return returnResponse(res, 500, {
                    message:"Faild to upload image"
                })
                let { categoryName } = fields
                categoryName.trim()

                let slug = categoryName.split(" ").join("-")

                // uploading the image
                const imageUrl = await imageUploader.upload(files.image, "categories")

                const category = await Category.create({
                    name:categoryName,
                    image:imageUrl,
                    slug
                })

                if(!category) return returnResponse(res, 500, {
                    message:"Something went wrong"
                })

               return  returnResponse(res, 201, {
                     message:"Cagegory added successfully",
                     category
                })

            })
        } catch (error) {
            console.log(error)
            returnResponse(res, 500, {
                message:error.message
            })
        }
    }

    async getCategory(req, res) {
        const { page,parPage, searchValue} = req.query
        try {
            const intParPage = parseInt(parPage)
            const intPage = parseInt(page)
            let skip;
            if(parPage && parPage){

                 skip = intParPage * (intPage - 1)
            }

            if(searchValue && parPage && page){

                const categories = await Category.find({
                    $text:{$search:searchValue}
                }).skip(skip).limit(intPage).sort({createdAt:-1})
                
                const totalCategory = await Category.find({$text:{$search:searchValue}}).countDocuments()
                return returnResponse(res, 200, {
                    totalCategory, categories
                })

            }else if(searchValue === "" && parPage && page){
                const categories = await Category.find().skip(skip).limit(intParPage).sort({createdAt: -1})
                const totalCategory = await Category.find().countDocuments()
                return returnResponse(res, 200, {
                    totalCategory,
                    categories
                })
            }else {
                const categories = await Category.find()
                const totalCategory = await Category.find().countDocuments()
                return returnResponse(res, 200, {
                    totalCategory, categories
                })
            }
        } catch (error) {
            console.log(error)
            return returnResponse(res, 500, {
                message:error.message
            })
        }
    }
}


module.exports = new CategoryController()