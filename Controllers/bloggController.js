const blogModel = require("../Models/blogModel")
const mongoose = require("mongoose")

const createBlog = async(req, res) =>{
    const blogDetails = req.body
    const userId = req.params.userId;
    blogDetails.userId = userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ status: false, message: "Invalid  ID" });
      }

   const {title , description} = blogDetails
   if(!title.trim() || !description.trim()){
    return res.status(400).send({status:false, message:"mandatory details missing"})

   }

   const createBlog = await blogModel.create(blogDetails)
   return res.status(201).send({status:true, message:"Blog has been created", data:createBlog})
}

const updateBlog = async(req, res) =>{
    const blogDetails = req.body
    const blogId = req.params.blogId
    const userId = req.params.userId
    const updatedBlogDetails = {}
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).send({ status: false, message: "Invalid  ID" });
      }

   const {title , description} = blogDetails
  
   if(title){
   if(blogDetails.title.trim()){
      updatedBlogDetails.title = blogDetails.title
   }
  }

if(description){
   if(blogDetails.description.trim()){
    updatedBlogDetails.description = blogDetails.description
 }
}

   const findBlog = await blogModel.findOne({_id: blogId})
  
   if(findBlog===null || !findBlog) return res.status(400).send({status:false, message:"Blog not found"})

   if(findBlog.userId.toString() !== userId) return res.status(403).send({status:false, message:"you are unauthorized"})

   const updateUsersBlog = await blogModel.findOneAndUpdate({_id:blogId},{...updatedBlogDetails},{new:true})

   return res.status(201).send({status:true, message:"Blog details updated", data:updateUsersBlog})
}

const deleteBlog = async(req, res) =>{
    const userId = req.params.userId;
    const blogId = req.params.blogId;

    //validating the mongoose id
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).send({ status: false, message: "Invalid  ID" });
      }


    const findBlog = await blogModel.findOne({_id: blogId})
   if(findBlog===null) return res.status(400).send({status:false, message:"Blog not found"})

   //vaidating that a blog can only be deletd by the user who created it
   if(findBlog.userId.toString() !== userId) return res.status(403).send({status:false, message:"you are unauthorized"})
   

   const deleteBlog = await blogModel.findOneAndUpdate({_id:blogId}, {isDeleted:true})

   return res.status(200).send({status:true, message:"blog deleted succesfully"})
}

const getAllBlogs = async(req, res) =>{
    const userId = req.params.userId
    
    //getting the documents who are not deleted
    const getBlogs = await blogModel.find({isDeleted:false})

    return res.status(200).send({status:true, message:"All blogs", data:getBlogs})
}

module.exports.createBlog = createBlog
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.getAllBlogs = getAllBlogs
