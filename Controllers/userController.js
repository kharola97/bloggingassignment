const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {isValidName, isValidEmail, isValidPassword, isValidNo } = require("../helper/validation")
require("dotenv").config();

const Secret_key = process.env.SECRET_KEY

// password hashing
const passwordHashing = async function (password) {
    return new Promise((resolve, reject) => {
      const saltRounds = 10; //default
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err)
          return reject(
            res.status(400).send({ status: false, message: "invalid password" })
          );
        else return resolve(hash);
      });
    });
  };


const registerUser = async(req, res)=>{
    const dataOfuser = req.body
    
    const {name , password, email, phone} = dataOfuser
    if(Object.keys(dataOfuser)===0) return res.status(400).send({status:false, message:"Details missing"})
    
    if(!name || !password || !email || !phone  ) return res.status(400).send({status:false, message:"mandatory fields missing "})




    //validating the name should not contain numbers
    if (!isValidName(name.trim()))
    return res.status(400).send({ status: false, message: "Name can only contains Alphabets." });
    dataOfuser.name = name.toLowerCase()

    //hashing the users name
    dataOfuser.name = await passwordHashing(name)


    //validating the phone number
    if (!isValidNo(phone))
      return res.status(400).send({status: false,message: "Please enter a valid Mobile number.",});
    
      //validating for unique phone number
    const findByPhone = await userModel.findOne({phone:phone})
    
    if(findByPhone){
        return res.status(400).send({status:false, message:"Phone number already exists"})
    }
      
    if (!isValidPassword(password.trim()))
    return res.status(400).send({ status: false, message: "at least 1 lowercase, at least 1 uppercase,contain at least1 numeric characterat least one special character, range between 8-12" });
    dataOfuser.password = password.toLowerCase()
    dataOfuser.password = await passwordHashing(password)

    //validating the email
      if (!isValidEmail(email))
      return res.status(400).send({ status: false, message: "Please enter valid email." });


    //validating for unique email

    const findByEmail = await userModel.findOne({email:email})
    if(findByEmail){
        return res.status(400).send({status:false, message:"Email already exists"})
    }


     //trimming the title to get rid of whitespaces
     

    const userRegistered = await userModel.create(dataOfuser)
    return res.status(201).send({status:true, message:"user successfully created"})
}

const loginUser = async(req,res)=>{
    const userDetails = req.body

    const {email, password} = userDetails

   
    if (!email || !password)
      return res.status(400).send({status: false,message: "Please enter Email Id and Password.",});
     userDetails.email = email.trim()
     userDetails.password = password.trim()
    let userData = await userModel.findOne({email:email})
    if (!userData)
      return res.status(400).send({ status: false, message: "Invalid Email or Password." });

    //using bcrypt library to comapre the password entered by user
    bcrypt.compare(userDetails.password, userData.password, function (err, result) {
      // if passwords match
      if (result) {
        let token = jwt.sign({ userId: userData._id }, Secret_key, {
          expiresIn: "24h",
        });
        
        return res.status(200).send({status: true,message: "Token have been generated",data: { userId: userData._id,token: token },});
      }
      // if passwords do not match
      else {
        return res.status(400).send({ status: false, message: "Invalid email or password" });
      }
    });
  
}

const updateUserDetails = async (req, res)=>{
    const userDetails = req.body
    const userId = req.params.userId
    let userIdFromToken = req.decodedToken.userId;
    if(userId !== userIdFromToken) return res.status(403).send({status:false, message:"You are unauthorized to update user details"})
  const {name, phone, email, password} = userDetails
    const updatedUserDetails = {}

    if(userDetails.name){
        if (!isValidName(name.trim()))
        return res.status(400).send({ status: false, message: "Name can only contains Alphabets." });
        updatedUserDetails.name = name.toLowerCase()
    }

    if(userDetails.phone){
         //validating the phone number
    if (!isValidNo(phone))
    return res.status(400).send({status: false,message: "Please enter a valid Mobile number.",});
  
    //validating for unique phone number
  const findByPhone = await userModel.findOne({phone:phone})
  
  if(findByPhone){
      return res.status(400).send({status:false, message:"Phone number already exists"})
  }

    updatedUserDetails.phone = userDetails.phone
    }

    if(userDetails.email){

        //validating the email
      if (!isValidEmail(email))
      return res.status(400).send({ status: false, message: "Please enter valid email." });


    //validating for unique email

    const findByEmail = await userModel.findOne({email:email})
    if(findByEmail){
        return res.status(400).send({status:false, message:"Email already exists"})
    }
    updatedUserDetails.email = userDetails.email

    }

    if(userDetails.password){

        if (!isValidPassword(password.trim()))
    return res.status(400).send({ status: false, message: "at least 1 lowercase, at least 1 uppercase,contain at least1 numeric characterat least one special character, range between 8-12" });
    updatedUserDetails.password = password.toLowerCase()
    updatedUserDetails.password = await passwordHashing(password)
        
    }

    const updatedDetails = await userModel.findOneAndUpdate({_id : userId}, {...updatedUserDetails}, {new:true})
    return res.status(201).send({status:true, message:"Deatils updated succesfully", data:updatedDetails})
}


module.exports.registerUser = registerUser
module.exports.loginUser = loginUser
module.exports.updateUserDetails = updateUserDetails