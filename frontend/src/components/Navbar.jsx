import React, { useState } from "react";
import assets from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  return (
    // <div className="fixed left-0 w-full bg-white flex items-center justify-between px-4 font-medium">
<div className="fixed top-0 left-0 w-full bg-white font-medium z-20">
  <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto px-4">
      <Link to='/'><img src={assets.logo} className='w-30 h-15' /> </Link> 

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700  hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700  hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700  hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700  hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6 ">
        <img
          src={assets.search_icon}
          alt="search button"
          className="w-5 cursor-pointer"
        />

        <div className="group relative ">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="profile-icon"
          ></img>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px] ">
            10
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu icon"
          className="sm:hidden w-5 cursor-pointer"
        />
      </div>

      {/* Side bar menu for small screens*/}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col z-50 bg-white text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
        
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT </NavLink>
          
        </div>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
