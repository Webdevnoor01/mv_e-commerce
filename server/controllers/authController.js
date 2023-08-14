const Admin = require("../models/adminModel");
const Seller = require("../models/sellerModel")

// libraries
const bcrypt = require("bcrypt");

// services
const tokenService = require("../services/token");

// Utils
const returnResponse = require("../utils/response");

class AuthController {


  async admin_login(req, res) {
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email: email }).select("+password");
      if (admin) {
        const isMatchPassword = await bcrypt.compare(password, admin.password);
        if (isMatchPassword) {
          // token object for creating token to store in cookie
          const tokenPayload = {
            id: admin._id,
            role: admin.role,
          };

          const token = await tokenService.create(tokenPayload);

          res.cookie("accessToken", token);

          returnResponse(res, 200, {
            status: "Ok",
            message: "Login successfully",
            token,
          });
        } else {
          returnResponse(res, 400, {
            status: "Bad",
            message: "Invalid email and password",
          });
        }
      }
      if (admin === null) {
        returnResponse(res, 400, {
          status: "Bad",
          message: "Invalid email and password",
        });
      }
    } catch (error) {
      res.status(error.status || 500).json({
        errors: {
          adminLogin: {
            msg: error.mesage,
          },
        },
      });
      console.log("authController:Error-> ", error);
    }
  }

  async seller_register(req, res) {
   const {name ,email, password} = req.body
   try {
    const user = await Seller.findOne({email:email})
    if(user){
      returnResponse(res, 400, {
        message:"Email already in used."
      })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    const userPayload = {
      name,
      email,
      password:hashedPassword,
      methode:"manualy"
    }
    
    const newUser = await Seller.create(userPayload)

    returnResponse(res, 201, {
      message:"User created successfully",
      user:newUser
    })
   } catch (error) {
    
   }
  }

  async getUser(req, res) {
    const {role, id } = req.user
    try {
      let user;
      if(role === "admin"){
        user = await Admin.findById(id)
      }

      returnResponse(res, 200, {
        status:"Ok",
        user
      })
    } catch (error) {
      console.log("authController:Error-> ", error)
    }
  }
}

module.exports = new AuthController();
