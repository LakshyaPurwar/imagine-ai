import express from 'express';
import * as dotenv from 'dotenv';
// import { v2 as cloudinary } from 'cloudinary';
import { Configuration , OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey : process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req , res)=>{
    res.send('Hello from dalle !');
});

router.route('/').post( async (req , res)=>{

    try{

        const { prompt } = req.body;
        console.log("Trying to retrieve and image");
        const aiResponse = await openai.createImage(
            {
                prompt,
                n : 1,
                size : '1024x1024',
                response_format:'b64_json',
               
            }
        );

        console.log("This is the status of the response from openai "+aiResponse.status);

        const image = aiResponse.data.data[0].b64_json; 

        res.status(200).json( { photo : image} );


    }
    catch(error){

        console.log("The status could not be reached and error occured");

        console.log(error.response);
        console.log(error.response.data);
        console.log(error.message);
        res.status(500).json({success : false , message : error.message});

    }

});

export default router;
