import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Landing_page = () => {
  const navigate = useNavigate();
  const Backend_url = import.meta.env.VITE_Backend_Url;
  const [text, setText] = useState("");
  const [Loading, setLoading] = useState(true);
  const [Inloading, setInLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [Userdata, setUserdata] = useState({});
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [result, setResult] = useState();
  const [error, setError] = useState(null);
  const [ShowResultLoading, setShowResultLoading] = useState(false);

  const HandleChange = (e) => {
    setText(e.target.value);
    setError(null);
  };

  const LogOut = async () => {
    try {
      const res = await axios.post(
        `${Backend_url}/api/login/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      if (res.status == 200) {
        navigate("/Login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong ");
    }
  };
  const handleCopy = async () => {
    // Guard against copying empty or placeholder text
    if (!result || Inloading) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopyButtonText("Copied! ✅");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2000); // Reset button text after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
      setCopyButtonText("Failed");
    }
  };
  const prompt =
    "Correct the following text and provide only the final, corrected version as the output." +
    text;
  const apihandeler = async () => {
    if (!text) {
      setError(null);
      setError("Please enter some text");
    } else {
      try {
        setResult(null);
        setError(null);
        setInLoading(true);
        setShowResultLoading(true);

        const response = await axios.post(`${Backend_url}/api/ai`, {
          prompt,
        });
        setResult(response.data);
        setTimeout(() => {
          setShowResultLoading(false);
        }, 1500);
      } catch (error) {
        setError(null);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const getuserinfo = async () => {
      try {
        const res = await axios.get(`${Backend_url}/api/login/getInfo`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          setUserdata(res.data);
        }
      } catch (err) {
        setMessage(err.response?.data?.message);
        if (err.response?.status === 401) {
          navigate("/Login");
        }
      } finally {
        setLoading(false);
      }
    };
    getuserinfo();
    setInLoading(false);
  }, []);
  return (
    <AnimatePresence mode="wait">
      {Loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex justify-center items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="border-4 w-12 h-12 rounded-full border-white/10 border-t-[#876cff]"
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1 }}
          className="flex w-full min-h-screen h-full font-inter bg-gradient-to-br from-[#0b1020] via-[#211f4b] to-[#0b3042]"
        >
          <div className=" w-[20%] text-white border-r border-white/10">
            <div className=" font-semibold  px-6 py-6 text-lg ">EnhanceAi</div>
            <div className=" py-[20px]">
              <div className="pl-8">
                <p className="text-white/50 text-sm">WELCOME BACK</p>
                <div className="flex gap-2">
                  <div className="bg-[#1e1640] w-12 h-12 rounded-full p-1">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#876cff] via-[#a291ff] to-[#c4b5fd]">
                      {Userdata?.name
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-bold mt-1">{Userdata.name}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[80%] min-h-screen h-full  text-white  pt-3">
            <div className="pt-0 p-[40px] h-full w-full">
              <div className="flex w-full">
                <p className="text-[32px] font-[800]">Text Enhancer</p>{" "}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={LogOut}
                  className="absolute flex gap-1 end-12 border-2 px-4 py-1 border-white/50 rounded-full cursor-pointer"
                >
                  <IoLogOutOutline className="mt-1" />
                  Logout
                </motion.button>
              </div>
              <p className="text-[16px] text-white/50 mb-2">
                A focused workspace with just two panels — one for your original
                text and one for the AI-enhanced output.
              </p>
              <div className="flex gap-5 w-full h-full justify-center items-center">
                <div className="relative w-[45%] border-white/30 border rounded-xl p-6 min-h-[500px] h-full">
                  <div className="font-semibold mb-2">Input</div>
                  <textarea
                     value={text}
                    onChange={HandleChange}
                    className="pt-0 px-[16px] h-[272px] w-full text-white/50 outline-none bg-transparent resize-none placeholder:text-white/30 "
                    placeholder="Paste or type your raw content here. For example: “We are excited to share our product update and hope users will find it useful for their workflows...”"
                  >
                    
                    {/* {error && (
                      <p className="text-red-500 mt-2 text-center">{error}</p>
                    )} */}
                  </textarea>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={apihandeler}
                    className="absolute bottom-10 flex gap-2 bg-gradient-to-r from-[#7963ff] to-[#538dff] rounded-xl py-2 px-2 "
                  >
                    Enhance Text <FaArrowRight className="mt-1" />
                  </motion.button>
                </div>
                <div className="w-[45%] border-white/30 border rounded-xl p-6 min-h-[500px] h-full">
                  <div className="font-semibold mb-2 ">Output</div>
                  <div className="pt-0 px-[16px] h-full w-full text-white/50  bg-transparent">
                    
                    {ShowResultLoading ? (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center h-[300px]"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="border-4 w-12 h-12 rounded-full border-white/10 border-t-[#876cff]"
                        />
                      </motion.div>
                    ) : (
                      <>
                        {Inloading?(
                          <>
                          {result}
                          </>
                      ):(<>
                      We’re excited to introduce our latest product update,
                    thoughtfully designed to make everyday workflows faster,
                    clearer, and more efficient. This release brings practical
                    improvements that help users accomplish more with less
                    friction while enjoying a smoother overall experience.
                      </>)}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Landing_page;
