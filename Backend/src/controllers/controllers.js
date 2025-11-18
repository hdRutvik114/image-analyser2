import axios from "axios"
import FormData from 'form-data';
import Jimp from "jimp";
import multer from "multer";

import QrCode from "qrcode-reader";
import fs from "fs";
export const uploadimage=async (req,res)=>{
    try{
      if(!req.file){
        return res.status(400).json({error:"No file upload"});
      }
   const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);
    formData.append('apikey', process.env.OCR_API_KEY || 'helloworld');
    formData.append('language', 'eng');
 // Send request to OCR.Space
       const response = await axios.post(
      'https://api.ocr.space/parse/image',
      formData,
      { headers: formData.getHeaders() }
    );

    const parsedText = response.data.ParsedResults?.[0]?.ParsedText || '';
    console.log(parsedText)
    if (!parsedText) return res.json({ ocrText: "", deepSeekAnalysis: "No text found" });

    // --- Step 2: Send extracted text to DeepSeek ---
    const deepSeekPrompt = `
      Here is the text extracted from an image:
      "${parsedText}"

      Please analyze it and give insights or a summary.
    `;
  const deepSeekResp = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are a smart text analyst. Analyze the following text carefully."
          },
          {
            role: "user",
            content: `${deepSeekPrompt}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.minmax}`,
          "Content-Type": "application/json"
        }
      }
    );

    // The analysis from DeepSeek
  
    const deepSeekAnalysis = deepSeekResp.data.choices?.[0]?.message?.content || "";
     console.log(deepSeekAnalysis)
     res.json({
      text: parsedText,
      deepSeekAnalysis
    });
   

    }catch(error){
console.error('OCR Error:', error.response?.status, error.response?.data);


    res.status(500).json({ error: 'OCR failed' });
    }
}

export const generatecaption=async (req,res)=>{
  // try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No image uploaded" });
//     }

//     const imageBuffer = req.file.buffer;
// //https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large
// //https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large
// // https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning
//     const response = await axios.post(


//       }
//     );


//     res.json({ caption });
//     console.log(caption)
    

//   } catch (error) {
//     console.error("Caption Error:", error);
//     res.status(500).json({ error: "Failed to generate caption" });
//   }
   try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const form = new FormData();
    form.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/ckandemir/blip-image-captioning-large-inference",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        },
        timeout: 60000
      }
    );

    const caption = response.data[0]?.generated_text || "No caption found";
    res.json({ caption });
    console.log("hh"+caption);

  } catch (error) {
    console.log(error)
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error generating caption" });
  }
}

export const qrcode_decoder=async (req,res)=>{
 try {
    // Assuming you already uploaded the image using multer.memoryStorage()
    const imageBuffer = req.file.buffer;

    const response = await axios.post(
      "https://qr-scanner-api.p.rapidapi.com/api/QR/scanimage",
      imageBuffer, // send image binary
      {
        headers: {
          "x-rapidapi-key": "d77e0f7977msh468951d67c0616bp11dd16jsne5502dccda30",
          "x-rapidapi-host": "qr-scanner-api.p.rapidapi.com",
          "Content-Type": "application/octet-stream",
        },
      }
    );

    console.log(response.data);
    // res.json(response.data);
  } catch (error) {
    console.error("❌ Decode Error:", error);
    res.status(500).json({ error: "Unexpected error", details: error.message });
  }
}

