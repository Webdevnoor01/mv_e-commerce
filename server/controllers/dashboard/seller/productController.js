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
            const image = imageUploaderService.upload(images[i],"products");
            allImageUrl.push(image)
          }
        }else{
          const image = await imageUploaderService.upload(images,"products");
          allImageUrl.push(image)
        }
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
}

module.exports = new ProductController();
