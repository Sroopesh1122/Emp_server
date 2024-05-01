const asyncHandler = require("express-async-handler");
const empSchema = require("../models/employeeSchema");
const path = require('path')
const { default: mongoose } = require("mongoose");
const fs = require('fs')
const { cloudinaryUploadImages } = require("../utils/Cloudinary");
const loginSchema= require('../models/loginnSchema')

const createEmp = asyncHandler(async (req, res) => {
  if (req.body) {
    const { name, mobile, email, designation, course, profile, gender } =
      req.body;
    if (
      !name ||
      !mobile ||
      !email ||
      !designation ||
      !course ||
      !profile ||
      !gender
    ) {
      throw new Error("All values required!");
    }
    const findEmp = await empSchema.findOne({ mobile, email });
    if (findEmp) {
      throw new Error("Employee already exists");
    }
    const newEmp = await empSchema.create(req.body);
    res.json(newEmp);
  } else {
    throw new Error("All field values required!");
  }
});

const updateEmp = asyncHandler(async (req, res) => {
  if (req.body) {
    const { id } = req.params;
    if (!id) {
      throw new Error("Something Went wrong");
    }
    const findEmp = await empSchema.findById(id)
    if (!findEmp) {
      throw new Error("Employee  not found");
    }
    const updatedEmp = await empSchema.findByIdAndUpdate(findEmp?._id , req.body,{new:true})
    res.json(updatedEmp);
  } else {
    throw new Error("All field values required!");
  }
});

const deleteEmp = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id) {
    const findEmp = await empSchema.findById(id);
    if (!findEmp) {
      throw new Error("Employee not exists!");
    }
    const deletedEmp = await empSchema.findByIdAndDelete(id);
    const result = {
      success: true,
      emp_id: deletedEmp?._id,
    };
    res.json(result);
  } else {
    throw new Error("Something Went Wrong");
  }
});

const getAllEmp = asyncHandler(async(req,res)=>{
    const allEmp =await empSchema.find();
    res.json(allEmp)
})

const getEmp =asyncHandler(async(req,res)=>{
    const {id} = req.params
    if(!id){
        throw new Error("Something Went Wrong");
    }
    const findEmp = await empSchema.findById(id);
    if(!findEmp)
    {
        throw new Error("Employee not found")
    }
    res.json(findEmp)
})

const Imageuploader = asyncHandler(async (req, res) => {
  console.log("file uploading");

  try {
    const uploader = (cpath) => cloudinaryUploadImages(cpath, "images");
    const urls = [];
    const paths = req.newPaths;
    const files = req.files;
    for (const fPath of paths) {
      const newpath = await uploader(path.join(__dirname, fPath));
      urls.push(newpath);
    }
    // for (const file of files) {
    //   fs.unlinkSync(file.path);
    // }
    const imagesUrls = urls.map((file) => {
      return file.url;
    });
    if(!imagesUrls[0])
    {
      throw new Error("Upload Failed")
    }
    res.json(imagesUrls[0]);
  } catch (error) {
    throw new Error(error);
  }
});

const adminLogin = asyncHandler(async(req,res)=>{
   const {username , password} = req.body;
   if(!username || !password)
   {
    throw new Error("Invalid Credentials");
   }

   const findData = await loginSchema.findOne({username, password})
   if(!findData)
   {
    throw new Error("Invalid Credentials");
   }

   res.json({
    success:true,
    user_data : findData
   })

})

const createLogin = asyncHandler(async(req,res)=>{
  const {username , password} = req.body;
   if(!username || !password)
   {
    throw new Error("Invalid Credentials");
   }

   const findData = await loginSchema.findOne({username, password})
   if(findData)
   {
    throw new Error("Admin already exists");
   }
   const admin = await loginSchema.create({username,password});
   res.json(admin)
})

module.exports = { createEmp, deleteEmp ,updateEmp, getAllEmp ,Imageuploader, getEmp, adminLogin, createLogin};
