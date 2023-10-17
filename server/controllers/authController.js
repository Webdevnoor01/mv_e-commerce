// Models
const Admin = require("../models/adminModel");
const Seller = require("../models/sellerModel");
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

          res.cookie("accessToken", token, {
            maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: true,
            httpOnly: true,
            domain:"https://eshopycart.netlify.app/"
          });
          returnResponse(res, 200, {
            message: "Login successfully",
            token,
            user: {
              id: admin._id,
              name: admin.name,
              email: admin.email,
              role: admin.role,
              status: admin.status,
              image: admin.image,
            },
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

  async seller_login(req, res) {
    const { email, password } = req.body;
    try {
      const seller = await Seller.findOne({ email: email }).select("+password");
      if (seller) {
        const isMatchPassword = await bcrypt.compare(password, seller.password);
        if (isMatchPassword) {
          // token object for creating token to store in cookie
          const tokenPayload = {
            id: seller._id,
            role: seller.role,
          };

          const token = await tokenService.create(tokenPayload);

          res.cookie("accessToken", token, {
            maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: true,
            httpOnly: true,
            domain:"https://eshopycart.netlify.app/"
          });

          return returnResponse(res, 200, {
            message: "Login successfully",
            token,
            user: {
              id: seller._id,
              name: seller.name,
              email: seller.email,
              role: seller.role,
              status: seller.status,
              image: seller.image,
            },
          });
        } else {
          returnResponse(res, 400, {
            status: "Bad",
            message: "Invalid email and password",
          });
        }
      }
      if (seller === null) {
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
    const { name, email, password, role } = req.body;
    try {
      const user = await Seller.findOne({ email: email });
      if (user) {
        return returnResponse(res, 400, {
          message: "Email already in used.",
        });
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const userPayload = {
        name,
        email,
        password: hashedPassword,
        methode: "manualy",
        role,
      };

      const newUser = await Seller.create(userPayload);

      let payload = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        image: newUser.image,
      };
      const token = tokenService.create(payload);

      res.cookie("accessToken", token, {
        maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      returnResponse(res, 201, {
        message: "User created successfully",
        user: payload,
      });
    } catch (error) {
      console.log("Error: ", error);
      returnResponse(res, 500, {
        message: error.message,
      });
    }
  }

  async getUser(req, res) {
    const { role, id } = req.user;
    try {
      let user;
      if (role === "admin") {
        user = await Admin.findById(id);
      } else {
        user = await Seller.findById(id);
      }
      returnResponse(res, 200, {
        status: "Ok",
        user,
      });
    } catch (error) {
      console.log("authController:Error-> ", error);
    }
  }
}

module.exports = new AuthController();
