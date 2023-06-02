const jwt = require("jsonwebtoken")

class Token {
    async create(data){
        return await jwt.sign(data,process.env.JWT_SECRET)
    }
}

module.exports = new Token