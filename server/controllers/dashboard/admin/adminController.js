// models
const Seller = require("../../../models/sellerModel");
// form data parser
const formidable = require("formidable");
// models
const Category = require("../../../models/admin/categoryModel");
const Sellers = require("../../../models/sellerModel");
// services
const imageUploader = require("../../../services/image-upload");

// utils
const returnResponse = require("../../../utils/response");

class AdminController {
  // get active seller form the databse
  async getActiveSellers(req, res) {
    const { page, parPage, searchValue } = req.query;
    try {
      if (searchValue) {
      } else {
        const sellers = await Sellers.find({ status: "active" })
          .limit(parseInt(parPage))
          .sort();
        const totalSellers = await Sellers.find({ status: "active" })
          .limit(parseInt(parPage))
          .countDocuments();
        if (!sellers) {
          console.log("seller error ", sellers);
          return returnResponse(res, 500, {
            message: "Something went wrong",
          });
        }

        return returnResponse(res, 200, {
          sellers,
          totalSellers,
        });
      }
    } catch (error) {
      console.log(error);
      return returnResponse(res, 500, error.message);
    }
  }
  // get inactive seller from the database
  async getInactiveSellers(req, res) {
    const { page, parPage, searchValue } = req.query;
    try {
      if (searchValue) {
      } else {
        const sellers = await Sellers.find({ status: "pending" })
          .limit(parseInt(parPage))
          .sort();
        const totalSellers = await Sellers.find({ status: "pending" })
          .limit(parseInt(parPage))
          .countDocuments();
        if (!sellers) {
          console.log("seller error ", sellers);
          return returnResponse(res, 500, {
            message: "Something went wrong",
          });
        }

        return returnResponse(res, 200, {
          sellers,
          totalSellers,
        });
      }
    } catch (error) {
      console.log(error);
      return returnResponse(res, 500, error.message);
    }
  }
  // get sellerInfo from the databse
  async getSeller(req, res){
    const { sellerId } = req.params
    try {
      const seller = await Seller.findById(sellerId)
      if(!seller){
        console.log("seller error ", seller)
        return returnResponse(res, 400, {
          message:"Seller not found"
        })
      }

      returnResponse(res, 200, {
        sellerInfo:seller
      })
    } catch (error) {
      console.log(error)
      returnResponse(res, 500, error.message)
    }
  }
  // Update seller status
  async updateSellerStatus(req, res) {
    const form = formidable();
    form.parse(req, async (err, fields) => {
      const { sellerId, status } = fields;
      if (err)
        return returnResponse(res, 500, {
          message: err,
        });

      try {
        const seller = await Seller.findByIdAndUpdate(sellerId, { status });
        if (!seller) {
          return returnResponse(res, 500, {
            message: "Failed to update seller status",
          });
        }
        const sellerInfo = await Seller.findById(seller._id).select("status")
        console
        return returnResponse(res, 200, {
          message: "Seller status update successfully",
          status:sellerInfo.status
        });
      } catch (error) {
        console.log(error);
        returnResponse(res, 500, {
          message: error.message,
        });
      }
    });
  }

  // store category into the databse
  async addCategory(req, res) {
    try {
      const form = formidable();
      form.parse(req, async (err, fields, files) => {
        if (err)
          return returnResponse(res, 500, {
            message: "Faild to upload image",
          });
        let { categoryName } = fields;
        categoryName.trim();

        let slug = categoryName.split(" ").join("-");

        // uploading the image
        const imageUrl = await imageUploader.upload(files.image, "categories");

        const category = await Category.create({
          name: categoryName,
          image: imageUrl,
          slug,
        });

        if (!category)
          return returnResponse(res, 500, {
            message: "Something went wrong",
          });

        return returnResponse(res, 201, {
          message: "Cagegory added successfully",
          category,
        });
      });
    } catch (error) {
      console.log(error);
      returnResponse(res, 500, {
        message: error.message,
      });
    }
  }
  // get category form the databse
  async getCategory(req, res) {
    const { page, parPage, searchValue } = req.query;
    try {
      const intParPage = parseInt(parPage);
      const intPage = parseInt(page);
      let skip;
      if (parPage && parPage) {
        skip = intParPage * (intPage - 1);
      }

      if (searchValue && parPage && page) {
        const categories = await Category.find({
          $text: { $search: searchValue },
        })
          .skip(skip)
          .limit(intPage)
          .sort({ createdAt: -1 });

        const totalCategory = await Category.find({
          $text: { $search: searchValue },
        }).countDocuments();
        return returnResponse(res, 200, {
          totalCategory,
          categories,
        });
      } else if (searchValue === "" && parPage && page) {
        const categories = await Category.find()
          .skip(skip)
          .limit(intParPage)
          .sort({ createdAt: -1 });
        const totalCategory = await Category.find().countDocuments();
        return returnResponse(res, 200, {
          totalCategory,
          categories,
        });
      } else {
        const categories = await Category.find();
        const totalCategory = await Category.find().countDocuments();
        return returnResponse(res, 200, {
          totalCategory,
          categories,
        });
      }
    } catch (error) {
      console.log(error);
      return returnResponse(res, 500, {
        message: error.message,
      });
    }
  }
}
module.exports = new AdminController();
