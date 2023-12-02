const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
     type:ObjectId,
     required:true,
     ref:"user"
   
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{ timestamps: true })


module.exports = mongoose.model("blog", blogSchema)