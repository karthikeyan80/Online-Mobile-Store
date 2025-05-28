import React from "react";
import { assets } from "../assets/assets";
const Navbar = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between ">
      <img src={assets.logo} alt="logo" style={{ width: '150px', height: 'auto' }} />
      <button className="bg-gray-600 text-white px-5 sm:px-7 sm:py-2  rounded-full text-xs sm:text-sm ">LOG OUT</button>
    </div>
  );
};

export default Navbar;
