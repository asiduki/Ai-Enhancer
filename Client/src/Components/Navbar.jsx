import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full mt-2 pr-10">
      <div className="ml-4 text-2xl font-bold">Text Enhancer</div>
      <motion.button className="float-left" onClick={() => navigate(-1)}>
      Go Back
    </motion.button>
    </div>
  );
};

export default Navbar;
