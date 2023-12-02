const jwt = require("jsonwebtoken");
const mongoose  = require("mongoose");
const blogModel = require("../Models/blogModel")
require("dotenv").config();

const Secret_key = process.env.SECRET_KEY

// ------Authentication------

const authentication = async function (req, res, next) {
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res
      .status(400)
      .send({ status: false, message: "token is required in headers" });
  }
  jwt.verify(token, Secret_key, (err, decodedToken) => {
    if (err) {
      return res.status(400).send({ status: false, message: "invalid token" });
    } else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};
// -----Authorization------------

const authorization = async function (req, res, next) {
  let userId = req.decodedToken.userId;
  let blogId = req.params.blogId;
  if (!mongoose.Types.ObjectId.isValid(blogId))
    return res.status(400).send({ status: false, message: "Invalid book ID" });

  let blogData = await blogModel.findOne({ _id: blogId });
  if (!blogData)
    return res
      .status(404)
      .send({ status: false, message: "Book with this ID is not present." });

  if (userId != blogData.userId)
    return res
      .status(403)
      .send({ status: false, message: "You are not authorized" });
  if (blogData.isDeleted == true) {
    return res
      .status(404)
      .send({ status: false, message: "blog already deleted" });
  }

  next();
};



module.exports = { authentication, authorization };