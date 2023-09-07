const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET
class Token {
    async createToken(tokenPayload){
        return await jwt.sign(tokenPayload, JWT_SECRET, {
            expiresIn: "7d"
        })
    }

    async verifyToken(token){
        return await jwt.verify(token, JWT_SECRET)
    }
}


module.exports = new Token()