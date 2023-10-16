const { Schema, model } = require("mongoose")

const sellerSchema =Schema({
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
    status:{
        type:String,
        default:'pending'
    },
    payment:{
        type:String,
        default:"inactive"
    },
    methode:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        default:{}
    },
    shopInfo:{
        type:Object,
        default:{}
    }
},
{
    timestamps:true
})

sellerSchema.index({
    name:"text",
    email:"text",
    "shopInfo.payment":"text",
    "shopInfo.district":"text",
    "shopInfo.state":"text",
    "shopInfo.pinCode":"text"
},{
    width:{
        name:5,
        brand:4,
        category:3,
        description:2
    }
})

module.exports = model("sellers", sellerSchema)