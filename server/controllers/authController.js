const Admin = require("../models/adminModel");

// libraries
const bcrypt = require("bcrypt")

// services
const tokenService = require("../services/token");

// Utils
const returnResponse = require("../utils/response");

class AuthController {
  async admin_login(req, res) {
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({email: email,}).select("+password");
      if (admin) {

        const isMatchPassword = await bcrypt.compare(password,admin.password )
        if(isMatchPassword){
            // token object for creating token to store in cookie
            const tokenPayload = {
                id:admin._id,
                name:admin.name,
                email:admin.email,
                role:admin.role,
                image:admin.image
            }

            const token = await tokenService.create(tokenPayload)

            res.cookie("accessToken",token)


            returnResponse(res, 200, {
              status: "Ok",
              message:"Login successfully",
              token
            });
        }else{
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
}

module.exports = new AuthController();
