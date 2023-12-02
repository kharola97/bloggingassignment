const express = require('express');
const router = express.Router();
const userController = require("./Controllers/userController");
const blogController = require("./Controllers/bloggController");
const {authentication, authorization} = require("./Middleware/middleware");


router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/updateuserdetails/:userId" , authentication, userController.updateUserDetails);


router.post("/createblog/:userId" ,authentication, blogController.createBlog);
router.put("/updateblog/:blogId/:userId" , authentication,authorization, blogController.updateBlog);
router.get("/getblogs", authentication, blogController.getAllBlogs);
router.delete("/deleteblog/:userId/:blogId", authentication, authorization, blogController.deleteBlog);

router.all('/*',(req,res)=>res.status(404).send("pagess not found"));
module.exports = router;