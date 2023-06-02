const { Schema, model } = require("mongoose")

const adminSchema =Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    role:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:""
    }
},
)

module.exports = new model("admins", adminSchema)