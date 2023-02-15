import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js'

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,

});

//GET ALL POSTS API ENDPOINT
router.route('/').get(async (req , res)=>{

    try{

        const posts  =  await Post.find({});

        res.status(200).json({ success : true , data : posts });

    }
    catch(error)
    {
        res.status(500).json({success : false , message : error});
    }

});




//CREATE A POST API ENDPOINT
router.route('/').post(async (req , res)=>{

    try{

        const { name , prompt , photo } = req.body;
        //First  upload the photo on cloudinary and obtain the photourl

        const photoUrl = await cloudinary.uploader.upload(photo);
        console.log("Image was  successfully uploaded ion cloudinary with url"+photoUrl);
        //Remeber  the photo was in the viewing ( prefixed ) format of base64.

        //Now the form data must be uploaded to the datamodel Post

        const newPost  = await Post.create({
            name,
            prompt,
            photo : photoUrl.url,
        });

        res.status(201).json({success : true , data:newPost});


        //This is how the new post ( in the schema format ) will be added to the collection/model we had created.
    }
    catch(error)
    {
        res.status(500).json({ success : false , message : error});
    }

});


export default router;