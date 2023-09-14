const { Schema, model } = require("mongoose")

const productSchema = Schema({
    sellerId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    shopName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    slug:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

productSchema.index({
    name:"text",
    brand:"text",
    category:"text",
    description:"text"
},{
    width:{
        name:5,
        brand:4,
        category:3,
        description:2
    }
})

module.exports = new model("products", productSchema)