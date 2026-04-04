import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { MdLogin } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { IoLogInOutline } from "react-icons/io5";

const Login = () => {
  const Backend_url = import.meta.env.VITE_Backend_Url;
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [Message, setMessage] = useState("");
  const [Loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_Backend_Url}/api/auth/google`;
  };

  const loginWithGithub = () => {
    window.location.href = `${import.meta.env.VITE_Backend_Url}/api/auth/github`;
  };

  const Login_button = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${Backend_url}/api/login/login`,
        { email: data.email, password: data.password },
        { withCredentials: true },
      );
      if (res.status == 200) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const getuserinfo = async () => {
      try {
        const res = await axios.get(`${Backend_url}/api/login/getInfo`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (err) {
        setMessage(err.response?.data?.message);
      }
    };
    getuserinfo();
  }, []);
  return (
    <AnimatePresence>
      {Loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center min-h-screen"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-12 h-12 rounded-full border-4 border-white/10 border-t-[#876cff]"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-gradient-to-br from-[#181a34] via-[#0b0f1c] to-[#191839] min-h-screen h-full p-0 "
        >
          <div className="flex flex-col md:flex-row md:p-3 md:items-center">
            <h1 className="font-semibold text-lg text-white ">EnhanceAI</h1>
            <p className="absolute right-4 text-white ">
              <Link to="/register" className="flex gap-2 items-center">
                Don't have an account?
                <button className="cursor-pointer px-2 py-1 mt-1 rounded bg-[#1e1e42] flex gap-1">
                  <IoLogInOutline className="mt-1" />
                  Sign up
                </button>
              </Link>
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <div className="hidden md:block bg-gradient-to-br  from-[#1f2143] via-[#202844] to-[#0d0d1e] w-[35%]  shadow-lg rounded-xl  pb-10 p-2 ">
              <h1 className="text-4xl md:text-5xl font-semibold leading-12 max-w-3xl mb-4">
                <span className="bg-gradient-to-r from-[#d6d6e7] to-[#7e7ec8] bg-clip-text text-transparent">
                  Sign in to your Ai
                </span>
                <br />

                <span className="bg-gradient-to-r from-[#b3b3df] to-[#8d8dbe] bg-clip-text text-transparent">
                  writing workspace.
                </span>
                <br />
              </h1>
              <p className="text-sm text-white/50 mb-5">
                Continue where you left off. Access your enhanced documents,
                <br />
                team workspace, and custom tone preferences.
              </p>
              <div className="flex text-white gap-6  text-center">
                <p className="bg-white/5 rounded-2xl px-2">Recent documents</p>
                <p className="bg-white/5 rounded-2xl px-2">Team workspace</p>
                <p className="bg-white/5 rounded-2xl px-2 ">Custom presets</p>
              </div>

              <p className="text-white/50 rounded-2xl px-2 mt-15">
                "EnhanceAI saved me hours of editing every week." <br />{" "}
                <span className="flex justify-end text-white">
                  — Sarah K., Content Manager
                </span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1f2143] via-[#202844] to-[#0d0d1e] text-white rounded-xl w-[90%] md:w-[40%] shadow-xl  md:ml-10 p-4 mt-4 md:mt-0">
              <h1 className="text-4xl text-bold">Create your account</h1>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Start for free and unlock your personal AI writing workspace.
              </p>
              <div className="flex flex-col md:flex-row gap-3 w-full justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/5  md:px-4 rounded-xl text-lg py-2 flex justify-center md:flex-row cursor-pointer"
                  onClick={loginWithGoogle}
                >
                  <IoLogoGoogle className="m-1" />
                  Continue with Google
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/5 px-4 rounded-xl text-lg md:py-2  flex justify-center md:flex-row cursor-pointer"
                  onClick={loginWithGithub}
                >
                  <FaGithub className="m-1" /> Continue with GitHub
                </motion.button>
              </div>
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-gray-400 text-sm whitespace-nowrap">
                  or sign in with email
                </span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>
              <form onSubmit={handleSubmit(Login_button)} className="w-full">
                <label htmlFor="" className="mt-2 text-white/50 text-sm ml-2">
                  Email
                </label>

                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  {...register("email")}
                  className="bg-white/5 px-2 rounded-xl text-lg outline-0 w-full  mb-4 py-3"
                  placeholder="jhonsnow@7kingdom.com"
                />
                <br />
                <label htmlFor="" className="mt-2 text-white/50 text-sm ml-2">
                  Password
                </label>

                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  className="bg-white/5 px-2 rounded-xl text-lg outline-0 w-full  mb-2 py-3"
                  type="password"
                  {...register("password")}
                  placeholder="********"
                />
                <div className="flex justify-center">
                  <span className="text-white/50">{Message}</span>
                </div>
                <br />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex justify-center gap-2 bg-gradient-to-r from-[#876cff] via-[#a291ff] to-[#896fff] rounded-xl text-lg outline-0 w-full mt-0 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-[#6f55ff] hover:via-[#9180ff] hover:to-[#755dff]"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="rounded-full border-white/50 border-t-white w-5 h-5 border-2"
                    ></motion.div>
                  ) : (
                    <>
                      <MdLogin className="mt-1 text-xl" /> Sign in
                    </>
                  )}
                </motion.button>
              </form>

              <br />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;
