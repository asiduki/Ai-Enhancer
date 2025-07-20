import React from "react";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Home = () => {
const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState(null);
  const HandleChange = (e) => {
    setText(e.target.value);
    setError(null);
  };
  const [copyButtonText, setCopyButtonText] = useState("Copy");

// Add this function inside your component
const handleCopy = async () => {
  // Guard against copying empty or placeholder text
  if (!result || loading) return;

  try {
    await navigator.clipboard.writeText(result);
    setCopyButtonText("Copied! ✅");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000); // Reset button text after 2 seconds
  } catch (err) {
    console.error('Failed to copy: ', err);
    setCopyButtonText("Failed");
  }
};
  const prompt =
    "Correct the following text and provide only the final, corrected version as the output." +
    text;
  const apihandeler = async () => {
  if (!text) {
    setError("Please enter some text");
    return;
  }
  try {
    setResult(null);
    setError(null);
    setLoading(true);
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/ai`, {
      prompt,
    });
    setResult(response.data);  
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  } catch (error) {
    console.error("API Error:", error);
    setError(error?.response?.data?.message || error.message || "Something went wrong");
    setLoading(false);
  }
};
  return (
    <>
    <Navbar/>
      <div className="w-full flex flex-col lg:flex-row font-sans items-center">
      
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8">
      
        <textarea
          value={text}
          onChange={HandleChange}
          className="w-full h-[60vh] resize-none bg-[#f1f1f1] border border-gray-700 rounded-lg placeholder:text-gray-500 text-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your text here..."
        />
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>

      
      <div className="flex lg:flex-col items-center justify-center p-2 lg:p-0">
         <div className="h-full w-px bg-gray-700 hidden lg:block"></div>
         <div className="w-full h-px bg-gray-700 lg:hidden"></div>
         <motion.button
            onClick={apihandeler}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className={`bg-[#4b9cff] text-white font-bold rounded-lg py-3 px-6 my-4 transition-all duration-300 hover:bg-[#3581d8] ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            {loading ? "Correcting..." : "Correct Text"}
          </motion.button>
          <div className="h-full w-px bg-gray-700 hidden lg:block"></div>
          <div className="w-full h-px bg-gray-700 lg:hidden"></div>
      </div>
      
      
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8">
  <div className="w-full h-[60vh] bg-gray-800 text-white rounded-lg border border-gray-700 flex flex-col">
    {/* MODIFIED HEADER */}
    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
      <h2 className="text-xl font-bold">Corrected Text</h2>
      {/* ADDED BUTTON */}
      {!loading && result && (
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-gray-700 text-sm rounded-md hover:bg-gray-600 transition-colors"
        >
          {copyButtonText}
        </motion.button>
      )}
    </div>
    <div className="p-4 overflow-y-auto h-full">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-full"
          >
            <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.p
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg whitespace-pre-wrap"
          >
            {result || <span className="text-gray-500">The corrected text will appear here...</span>}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  </div>
</div>
    </div>
    </>
  );
};

export default Home;
