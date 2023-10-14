const formidable = require("formidable");

// model
const Product = require("../../../models/seller/productModel");
// service
const imageUploaderService = require("../../../services/image-upload");

// utility functions
const returnResponse = require("../../../utils/response");

class ProductController {
  async addProduct(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      try {
        const { images } = files;
        let allImageUrl = [];
        // Uploading images into cloudinary
        if(images.length > 1 ){

          for (let i = 0; i < images.length; i++) {
            const image = await imageUploaderService.upload(images[i],"products");
            allImageUrl.push(image)
          }
        }else{
          const image = await imageUploaderService.upload(images,"products");
          allImageUrl.push(image)
        }

        console.log(allImageUrl)
        // Preapering the payload to create product
        let productPayload = {
          sellerId: req.user.id,
          shopName:fields.shopName,
          name: fields.name.trim(),
          brand: fields.brand.trim(),
          category: fields.category.trim(),
          description: fields.description,
          stock: parseInt(fields.stock),
          price: parseInt(fields.price),
          discount: parseInt(fields.discount),
          images: allImageUrl,
          slug: fields.name.split(" ").join("-"),
        };

        // creating the product
        const product = await Product.create(productPayload);

        if (!product) {
          return returnResponse(res, 500, {
            message: "failed to add product into DB",
            error: product,
          });
        }

        return returnResponse(res, 201, {
          message: "product added successfully",
        });
      } catch (error) {
        console.log("productController-Error-> ", error);
        return returnResponse(res, 500, {
          message: error.message,
        });
      }
    });
  }

  async getProduct(req, res) {
    const { page, parPage, searchValue  } = req.query
    try {

      const skip = parseInt(parPage) * (parseInt(page) - 1)
      if(searchValue){
        const products = await Product.find({
          $text:{$search:searchValue},
          sellerId:req.user.id
        }).skip(skip).limit(parseInt(page)).sort({createdAt:-1})
        const totalProducts = await Product.find({
          $text:{$search:searchValue}
        }).countDocuments()

        return returnResponse(res, 200, {
          products,
          totalProducts
        })
      }else{
        const products = await Product.find({
          sellerId:req.user.id
        }).skip(skip).limit(parseInt(parPage)).sort({createdAt:-1})
        const totalProducts = await Product.find({
         sellerId:req.user.id
        }).skip(skip).limit(parseInt(parPage)).countDocuments()

        return returnResponse(res, 200, {
          products,
          totalProducts
        })
      }
    } catch (error) {
      return returnResponse(res, 500, {
        message:error.message
      })
    }
  }

  async getProductById(req, res) {
    const {productId } = req.params
    try {
      const product = await Product.findById(productId)

      if(!product){
        return returnResponse(res, 404, {
          message:"Product not found"
        })
      }

      returnResponse(res, 200, {
        product
      })
    } catch (error) {
      
    }
  }

  // Update product into the database
  async updateProduct(req, res){
    const {productId }= req.params
    try {
      const form = formidable()
      form.parse(req, async(err, fields) => {
        const product = await Product.findByIdAndUpdate(productId, fields)
        if(!product){
          return returnResponse(res, 404, {
            message:"Failed to update product"
          })
        }

        returnResponse(res, 200, {
          message:"Product update successfully"
        })
      })
    } catch (error) {
      console.log("productController: updateProduct-Error-> ", error)
      return returnResponse(res, 500, {
        message:error.message
      })
    }
  }


  // Update product image into db
  async updateProductImage(req, res){
    const {productId }= req.params
    try {
      const form = formidable()
      form.parse(req, async(err, fields, files) => {
        const { publicId, index } = fields
        const { newImage} = files

        if(publicId){

          await imageUploaderService.remove(publicId)
        }
        const newUploadedImage = await imageUploaderService.upload(newImage, "products")
        
        let  { images } =  await Product.findById(productId)
        images[index] = newUploadedImage

        const product = await Product.findByIdAndUpdate(productId, {images})
        
        if(!product) {
          return returnResponse(res, 400, {
            message:"Failed to change image"
          })
        }

        return returnResponse(res, 201, {
          message:publicId ? "Image changed successfully":"Image upload successfully"
        })
      })
    } catch (error) {
      console.log("productController: updateProductImage-Error-> ", error)
      return returnResponse(res, 500, {
        message:error.message
      })
    }
  }

  // Delete product from the database
  async deleteProduct(req, res){
    try {
      
    } catch (error) {
      console.log("productController: deleteProduct-Error-> ", error)
      return returnResponse(res, 500, {
        message:error.message
      })
    }
  }
}

module.exports = new ProductController();
