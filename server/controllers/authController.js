const Admin = require("../models/adminModel");

// libraries
const bcrypt = require("bcrypt");

// services
const tokenService = require("../services/token");

// Utils
const returnResponse = require("../utils/response");

class AuthController {
  async admin_login(req, res) {
    const { email, password } = req.body;
    console.log(req.body)
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
    console.log('body ', req.body)
    res.status(200).json({
        message:'its working'
    })
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
