const jwt = require("jsonwebtoken");
const returnResponse = require("../utils/response");

class AuthMiddleware {
  async authenticate(req, res, next) {
    const { accessToken } = req.cookies;
    try {
      if (!accessToken) {
        returnResponse(res, 409, {
          status: "Bad",
          message: "Unauthorized access",
        });
      }

      const user = await jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      returnResponse(res, 409, {
        status: "Bad",
        message: "Unauthorized access",
      });
    }
  }
}

module.exports = new AuthMiddleware()
