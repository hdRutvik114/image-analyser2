import React, { useEffect, useState,useRef } from 'react';
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
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


  useEffect(() => {
    if (deepseek) setdeep(deepseek)
  }, [deepseek]);

  const contentRef = useRef();
const handlePDF = () => {
  const element = contentRef.current;

  // 💡 temporarily override background + text color (fix for oklch crash)
  const oldBg = element.style.backgroundColor;
  const oldColor = element.style.color;

  element.style.backgroundColor = "#ffffff"; // set white bg
  element.style.color = "#000000"; // black text

  const opt = {
    margin: 0.5,
    filename: "analysis.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      // 🧼 restore original colors after export
      element.style.backgroundColor = oldBg;
      element.style.color = oldColor;
    })
    .catch((err) => console.error("PDF export error:", err));
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
             <div className='px-3 my-3 text-white'>
  <article className="prose prose-invert max-w-none">
    <ReactMarkdown>{deep ? deep : "No Analysis"}</ReactMarkdown>
  </article>
</div>

              {/* Download button */}
              <div className='text-center mt-4'>
                <button
                  onClick={handlePDF}
                  className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg'
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

