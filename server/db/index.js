const mongoose = require("mongoose")

class InitDB {
    connect(uri){
        return mongoose.connect(uri)
    }
}

module.exports = new InitDB()