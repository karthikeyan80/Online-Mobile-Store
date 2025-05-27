import React from "react";
import { assets } from "../assets/assets";
const Navbar = () => {
  return (
    <div>
      <img className="max(w-[10%,80px])" src={assets.logo} alt="logo" />
      <button>LOG OUT</button>
    </div>
  );
};

export default Navbar;
