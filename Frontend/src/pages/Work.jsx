import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUpload, FiClock, FiCheck, FiX } from 'react-icons/fi';
import WorkAI from '../components/WorkAI.jsx';
import ReactMarkdown from "react-markdown";
import jsQR from "jsQR";
const Work = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [text, settext] = useState("")
  const [caption, setcaption] = useState(null);
  const [mode, setmode] = useState("photo")
  const [upi, setupi] = useState(null)
  const [deep, setdeep] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      showNotification('Please select a valid image file', 'error');
    }
  };


  //   const handleUpload = async () => {
  //     if (!selectedImage) {

  //       alert("Please upload an image first!");
  //       return;
  //     }



  //      setLoading(true);
  //     const formData = new FormData();
  //     formData.append('image', selectedImage);

  //     try {
  //       console.log("here");
  //       if(mode==="photo"){
  //       const response = await axios.post('http://localhost:5000/api/auth/upload', formData);
  //       // const captionresonse= await axios.post("http://localhost:5000/api/auth/caption",formData);
  //       // setcaption(captionresonse.data.caption);
  //       setUploadHistory(prev => [{
  //         image: previewUrl,
  //         response: response.data,
  //         timestamp: new Date().toLocaleString()
  //       }, ...prev]);
  //       setSelectedImage(null);
  //       setPreviewUrl(null);
  //       showNotification('Image uploaded successfully!', 'success');
  //     // Suppose `response` is what you got from axios/fetch
  // const rawText = response.data.text || "";
  // let cleanedText = rawText.replace(/^"+|"+$/g, "")
  //                          .replace(/\\r\\n/g, "\n")
  //                          .split("\n")
  //                          .map(line => line.trim())
  //                          .join("\n");

  // const deepSeekAnalysis = response.data.deepSeekAnalysis || "";

  // console.log("Cleaned OCR Text:\n", cleanedText);
  // console.log("DeepSeek Analysis:\n", deepSeekAnalysis);

  //       settext(cleanedText);
  //       setdeep(deepSeekAnalysis)
  //       }else{
  //           console.log("I came here")
  //           const qr_response=await axios.post("http://localhost:5000/api/auth/qrcode",formData);
  //           if(qr_response.data.success){
  //             const upiId=qr_response.data||"No qr detected";
  //             // const code=qr_response.data.decoded;
  //             console.log(code);
  //             setupi(upiId);
  //           }



  //       }



  //     } catch (error) {
  //       console.error('Upload failed:', error);
  //       showNotification('Upload failed. Please try again.', 'error');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };


  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);

    try {
      console.log("here");

      // 📸 If mode is 'photo', use your existing backend OCR / analysis flow
      if (mode === "photo") {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const response = await axios.post("http://localhost:5000/api/auth/upload", formData);

        setUploadHistory(prev => [
          {
            image: previewUrl,
            response: response.data,
            timestamp: new Date().toLocaleString(),
          },
          ...prev,
        ]);

        setSelectedImage(null);
        setPreviewUrl(null);
        showNotification("Image uploaded successfully!", "success");

        const rawText = response.data.text || "";
        let cleanedText = rawText
          .replace(/^"+|"+$/g, "")
          .replace(/\\r\\n/g, "\n")
          .split("\n")
          .map(line => line.trim())
          .join("\n");

        const deepSeekAnalysis = response.data.deepSeekAnalysis || "";

        console.log("Cleaned OCR Text:\n", cleanedText);
        console.log("DeepSeek Analysis:\n", deepSeekAnalysis);

        settext(cleanedText);
        setdeep(deepSeekAnalysis);
      }
      // 🧩 else: use jsQR to decode QR in browser (no backend)
      else {
        //     console.log("Scanning QR locally using jsQR...");

        //     const reader = new FileReader();

        //     reader.onload = function (e) {
        //       const image = new Image();
        //       image.src = e.target.result;

        //       image.onload = function () {
        //         const canvas = document.createElement("canvas");
        //         const ctx = canvas.getContext("2d");

        //         canvas.width = image.width;
        //         canvas.height = image.height;

        //         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        //         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //         const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        //         if (qrCode) {
        //           console.log("✅ QR Code Data:", qrCode.data);
        //           setupi(qrCode.data); // this updates your WorkAI
        //           showNotification("QR code detected successfully!", "success");
        //         } else {
        //           console.warn("⚠️ No QR code found");
        //           setupi("No QR code detected");
        //           showNotification("No QR code detected", "error");
        //         }
        //       };
        //     };

        //     reader.readAsDataURL(selectedImage);
        //   }
        // } catch (error) {
        //   console.error("Upload failed:", error);
        //   showNotification("Upload failed. Please try again.", "error");
        // } finally {
        //   setLoading(false);
        // }

        const qrText = await scanQRCode(selectedImage);


        if (!qrText) {
          setOutput("⚠️ No QR code detected in the image");
          return;
        }

        // ✅ Detect if it’s a UPI QR
        if (qrText.startsWith("upi://pay")) {
          try {
            const url = new URL(qrText);
            const params = new URLSearchParams(url.search);

            const upiID = params.get("pa");
            const name = decodeURIComponent(params.get("pn") || "");
            const aid = params.get("aid");

            setupi(
              `💰 <strong>Detected UPI Payment QR</strong><br /><br />
    <strong>Name:</strong> ${name || "N/A"}<br />
    <strong>UPI ID:</strong> ${upiID || "N/A"}<br />
  
       ` );
          } catch (err) {
            setupi(`⚠️ Error parsing UPI link:\n${err.message}`);
          }
        } else if (qrText.startsWith("http://") || qrText.startsWith("https://")) {
          setupi(`🌐 Website Link Detected:<br />
     <a href="${qrText}" target="_blank" rel="noopener noreferrer" style="color:#2563eb; text-decoration:underline;">
       ${qrText}
     </a>`);
        }

        else {
          // 📄 Generic QR content
          setupi(`📄 QR Content:\n${qrText}`);
        }
      }
    } catch (err) {
      setupi(`⚠️ Error parsing UPI link:\n${err.message}`);
    }
    finally {
      setLoading(false);
    }
  }

  const scanQRCode = async (file) => {
    const imgBitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imgBitmap.width;
    canvas.height = imgBitmap.height;
    ctx.drawImage(imgBitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const code = jsQR(imageData.data, imageData.width, imageData.height);
    return code ? code.data : null;
  };


  return (
    <div className="container mx-auto px-4 py-8  min-h-[calc(100%-79px)]  max-w-7xl">

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white z-50`}
        >
          {notification.message}
        </motion.div>
      )}

      <div className="flex h-[80vh] max-h-[650px] justify-between  ">
        {/* Upload Section */}
        <div className='w-[50%] border-r pl-4 '>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg w-[75%]"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <FiUpload className="mr-2" />
                Upload Image
              </h2>
              <select
                value={mode}
                onChange={(e) => setmode(e.target.value)}
                name=""
                id=""
                className="text-black border rounded p-2 mb-4"
              >
                <option value="photo">Normal</option>
                <option value="qrcode">Qr code</option>
              </select>
            </div>

            <div className="space-y-6">
              <div
                className={`border-3 border-dashed rounded-xl h-45 flex items-center justify-center p-8 transition-all duration-300 ${previewUrl ? "border-blue-500" : "border-gray-300"
                  } hover:border-blue-400 cursor-pointer`}
                onClick={() => document.querySelector('input[type="file"]').click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {previewUrl ? (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded-lg shadow-md object-contain transition-all duration-300 hover:scale-95"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <FiUpload className="mx-auto text-4xl mb-2" />
                    <p>Click or drag image here to upload</p>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                disabled={!selectedImage || loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold shadow-md transition-all duration-300 ${!selectedImage || loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Processing...
                  </div>
                ) : (
                  "Upload Image"
                )}
              </motion.button>
            </div>
          </motion.div>

          <div className="w-[461px] rounded-2xl p-6 bg-slate-700 mt-3  border text-white">
            {text ? (
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-3">Extracted Text:</h3>
                <textarea
                  value={text}
                  readOnly
                  className="w-full h-30 bg-slate-800 text-white p-3 rounded-lg resize-none overflow-y-auto focus:outline-none border border-slate-600"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(text);
                    alert("Text copied to clipboard!");
                  }}
                  className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 transition-all rounded-lg font-semibold text-white"
                >
                  Copy Text
                </button>
              </div>
            ) : (
              <p className="text-gray-300 text-center">No text available.</p>
            )}
          </div>


        </div>
        <div className='w-[50%] max-h-[500px]'>     <WorkAI deepseek={deep} qrcode={mode} analysed={upi} />
        </div>





        {/* History Section
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
            <FiClock className="mr-2" />
            Upload History
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
            {uploadHistory.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={`Upload ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">
                      {item.timestamp}
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
                        {JSON.stringify(item.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {uploadHistory.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <FiClock className="mx-auto text-4xl mb-2" />
                <p>No upload history yet</p>
              </div>
            )}
          </div>
        </motion.div> */}

      </div>

    </div>
  );
};

export default Work;