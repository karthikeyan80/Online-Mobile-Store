import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from 'react-router-dom';


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 50;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = (itemId, RAM) => {
    if (!RAM) {
      toast.error("Please select the RAM");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][RAM]) {
        cartData[itemId][RAM] += 1;
      } else {
        cartData[itemId][RAM] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][RAM] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      const ramOptions = cartItems[itemId];
      for (const ram in ramOptions) {
        try {
          if (ramOptions[ram] > 0) {
            totalCount += ramOptions[ram];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async(itemId ,RAM, quantity)=>{
    let cartData = structuredClone(cartItems)
    cartData[itemId][RAM]=quantity
    setCartItems(cartData)
    
  }

  const getCartAmount =() => {
    let totalAmount=0;
    for(const items in cartItems){
      let itemInfo = products.find((product)=>product._id === items);
      for (const item in cartItems[items]){
        try{
           if(cartItems[items][item] > 0){
            totalAmount+=itemInfo.price*cartItems[items][item];
           }
        }catch(error){

        }
      }
    }
    return totalAmount;
    
  }


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
