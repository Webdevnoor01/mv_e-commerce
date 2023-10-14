const jwt = require("jsonwebtoken");
const returnResponse = require("../utils/response");

class AuthMiddleware {
  async authenticate(req, res, next) {
    const { accessToken } = req.cookies;
    try {
      if (!accessToken) {
        return returnResponse(res, 401, {
          status: "Bad",
          message: "Unauthorized access",
        });
      }

      const user = await jwt.verify(accessToken, process.env.JWT_SECRET);
      if (!user) {
        return returnResponse(res, 401, {
          statsu: "Bad",
          message: "Unauthorized access",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      returnResponse(res, 401, {
        status: "Bad",
        message: "Unauthorized access",
      });
    }
  }
}

module.exports = new AuthMiddleware();
