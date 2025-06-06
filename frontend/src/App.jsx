import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PLaceOrder from "./pages/PLaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from 'react-toastify';
import Contact from "./pages/Contact";

const App = () => {
  return (
  
    <div className='px-4  sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
    
  
    <Navbar />
    <SearchBar />

 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="place-order" element={<PLaceOrder />} />
      <Route path="orders" element={<Orders />} />
       <Route path="/contact" element={<Contact />} />
    </Routes>
    <Footer />
  </div>
  );
};

export default App;
