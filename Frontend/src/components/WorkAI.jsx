import React, { useEffect, useState,useRef } from 'react';
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import MyPDF from './MyPDF.jsx';
const WorkAI = ({ deepseek, qrcode, analysed }) => {
  const [caption, setcaption] = useState("")
  const [object, setobject] = useState("")
  const [deep, setdeep] = useState("")
  const [upiid, setupiid] = useState(null)
  // const handlecaption1=async () =>{
  //   console.log(caption);
  //   setcaption(handlecaption);
  // }

  // setdeep(deepseek);

const contentRef = useRef(null);

  useEffect(() => {
    if (deepseek) setdeep(deepseek)
  }, [deepseek]);

// Remove unsupported OKLCH colors BEFORE generating PDF
const handlePDF = () => {
  if (deep && deep.trim() !== "") {
    MyPDF({ markdown: deep });
  }
};
  console.log("heere is analysed:" + analysed);
  return (
    <div className=' w-[100%]  px-4 py-8 p-3 rounded-2xl' >
      <div className='w-[100%] max-h-137 overflow-y-auto bg-slate-700  rounded-2xl'>
        {/* {qrcode==="photo" ?(
          <>
          <div className='w-full  border-b p-1'>
               <h1 className='text-5xl text-center font-mono mt-2 rounded-3xl'>Image Caption </h1>
              </div>
         
         <div className='px-3 my-3'> 

               <article className="prose prose-slate max-w-none">
            <ReactMarkdown>{deep?deep:"No Analysis"}</ReactMarkdown>
               </article>
         </div>
      
          </> */

          qrcode === "photo" ? (
            <>
              {/* Title */}
              <div className='w-full border-b p-1'>
                <h1 className='text-5xl text-center font-mono mt-2 rounded-3xl text-white'>
                  Image Caption
                </h1>
              </div>

              {/* Exportable content */}
             <div ref={contentRef} className="pdf-safe p-4 px-3 my-3">
  <article className="prose max-w-none">
    <ReactMarkdown>{deep ? deep : "No Analysis"}</ReactMarkdown>
  </article>
</div>

             {/* <div className='px-3 my-3 text-white'>
</div> */}

              {/* Download button */}
              <div className='text-center mt-4'>
               <button
  onClick={handlePDF}
  disabled={!deep || deep.trim() === ""}
  className={`px-4 py-2 rounded-lg font-semibold
    ${(!deep || deep.trim() === "") 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-blue-500 hover:bg-blue-600 text-white"}
  `}
>
  📄 Download PDF
</button>

              </div>
            </>

          ) :
        (


        <div className='p-2 m-2 rounded-2xl'>
          <div className='p-1 border-b py-3'>
            <h1 className='text-5xl text-center '>QR Code</h1>


          </div>
          <div className='py-3 px-2 bg-slate-400 my-2 rounded-md'>
            {/* {analysed?(
    <p className="text-green-600 font-semibold">
      Content: <span className="font-mono">{analysed}</span>
    </p>
  ) : (
    <p className="text-red-500">No UPI ID found in QR</p>
  )} */}
            {analysed ? (
              <div
                className="text-white font-semibold font-mono"
                dangerouslySetInnerHTML={{ __html: analysed }}
              ></div>
            ) : (
              <p className="text-red-500">No UPI ID found in QR</p>
            )}

          </div>

        </div>


        )
        
        }


      </div>



    </div>
  )
  {/* {deep?<p className='ml-4 mt-4 font-mono text-white'>{deep}</p>:<p className='ml-4 mt-4 font-mono text-red-400'>"No Analysis"</p>}   */ }
  {/* <p className='ml-4 mt-4 font-mono text-white'>{caption? caption :"No caption available for the image"}</p> */ }
  {/* {object?<p className='ml-4 mt-4 font-mono text-white'>{object}</p>:<p className='ml-4 mt-4 font-mono text-red-400'>"No Object detected"</p>}    */ }
}


export default WorkAI;

