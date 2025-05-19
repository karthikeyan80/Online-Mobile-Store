import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 50;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

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
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
