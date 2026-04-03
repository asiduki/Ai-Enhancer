import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { MdLogin } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const Backend_url = import.meta.env.VITE_Backend_Url;
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [Message, setMessage] = useState("");

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_Backend_Url}/api/auth/google`;
  };

  const loginWithGithub = () => {
    window.location.href = `${import.meta.env.VITE_Backend_Url}/api/auth/github`;
  };

  const Register_button = async (data) => {
    try {
      const res = await axios.post(
        `${Backend_url}/api/login/register`,
        { email: data.email, password: data.password, name: data.name },
        { withCredentials: true },
      );
      if (res.status == 200) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong ");
    }
  };
  return (
    <div className="bg-gradient-to-br from-[#181a34] via-[#0b0f1c] to-[#191839] min-h-screen h-full p-0 ">
      <div className="flex p-3">
        <h1 className="font-semibold text-l text-white">EnhanceAI</h1>
        <p className="absolute right-4 text-white">
          <Link to="/Login">Already have an account?{" "}
          <button className="cursor-pointer border border-black  px-2 py-2 rounded">
            Sign in
          </button></Link>
          
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <div className="bg-gradient-to-br  from-[#1f2143] via-[#202844] to-[#0d0d1e] w-[35%]  shadow-lg rounded-xl  pb-10 p-2 font-inter">
          <h1 className="text-4xl md:text-5xl font-semibold leading-12 max-w-3xl mb-4">
            <span className="bg-gradient-to-r from-[#d6d6e7] to-[#7e7ec8] bg-clip-text text-transparent">
              Create your
            </span>
            <br />

            <span className="bg-gradient-to-r from-[#b3b3df] to-[#8d8dbe] bg-clip-text text-transparent">
              account and
            </span>
            <br />

            <span className="bg-gradient-to-r from-[#8d96c9] to-[#6e6eb3] bg-clip-text text-transparent">
              start
            </span>
            <br />

            <span className="bg-gradient-to-r from-[#6c6cac] to-[#545497] bg-clip-text text-transparent font-bold">
              enhancing text
            </span>
            <br />

            <span className="bg-gradient-to-r from-[#8d8df7] to-[#383875] bg-clip-text text-transparent font-bold">
              in seconds.
            </span>
          </h1>
          <p className="text-sm text-white/50 mb-5">
            Join teams, creators, and recruiters using AI to rewrite drafts,
            <br />
            sharpen tone, and turn rough notes into polished <br />
            communication.{" "}
          </p>
          <div className="flex text-white gap-6">
            <p className="bg-white/5 rounded-2xl px-2">
              Smart Rewrite Suggestion{" "}
            </p>
            <p className="bg-white/5 rounded-2xl px-2">Private workspace</p>
          </div>
          <p className="text-white bg-white/5 rounded-2xl px-2 w-35 mt-4">
            Instant at Output
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#1f2143] via-[#202844] to-[#0d0d1e] text-white rounded-xl w-[40%] shadow-xl  ml-10 p-4">
          <h1 className="text-4xl text-bold">Create your account</h1>
          <p className="text-gray-500 text-sm mt-2 mb-4">
            Start for free and unlock your personal AI writing workspace.
          </p>
          <div className="flex gap-3 w-full justify-center">
            <button
              className="bg-white/5  px-2 rounded-xl text-lg flex cursor-pointer"
              onClick={loginWithGoogle}
            >
              <IoLogoGoogle className="m-1" />
              Continue with Google
            </button>
            <button
              className="bg-white/5 px-2 rounded-xl text-lg flex cursor-pointer"
              onClick={loginWithGithub}
            >
              <FaGithub className="m-1" /> Continue with GitHub
            </button>
          </div>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-400 text-sm whitespace-nowrap">
              or sign up with email
            </span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>
          <form onSubmit={handleSubmit(Register_button)} className="w-full">
            <label htmlFor="" className="mt-2 text-white/50 text-sm ml-2">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="bg-white/5 px-2 rounded-xl text-lg outline-0 w-full  mb-4 py-3"
              placeholder="Jhon Snow"
            />
            <br />
            <label htmlFor="" className="mt-2 text-white/50 text-sm ml-2">
              Email
            </label>

            <input
              type="email"
              {...register("email")}
              className="bg-white/5 px-2 rounded-xl text-lg outline-0 w-full  mb-4 py-3"
              placeholder="jhonsnow@7kingdom.com"
            />
            <br />
            <label htmlFor="" className="mt-2 text-white/50 text-sm ml-2">
              Password
            </label>

            <input
              className="bg-white/5 px-2 rounded-xl text-lg outline-0 w-full  mb-2 py-3"
              type="password"
              {...register("password")}
              placeholder="********"
            />
            <div className="flex justify-center">
            <span className="text-white/50">{Message}</span>
            </div>
            <br />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#876cff] via-[#a291ff] to-[#896fff] px-2 rounded-xl text-lg outline-0 w-full mt-0 py-2 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <br />
        </div>
      </div>
    </div>
  );
};

export default Register;
