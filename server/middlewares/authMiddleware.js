const jwt = require("jsonwebtoken");
const returnResponse = require("../utils/response");

class AuthMiddleware {
  async authenticate(req, res, next) {
    const { accessToken } = req.cookies;
    try {
      const authorizationToken = req.headers.authorization.split(" ")[1]
      const token = accessToken?accessToken:authorizationToken
      if (!token) {
        return returnResponse(res, 401, {
          status: "Bad",
          message: "Unauthorized access",
        });
      }
      const user = await jwt.verify(token, process.env.JWT_SECRET);
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
