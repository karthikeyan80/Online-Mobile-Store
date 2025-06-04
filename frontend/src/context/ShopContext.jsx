import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 50;

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || ""
  );
  const navigate = useNavigate();

  const addToCart = async (itemId, RAM) => {
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


    if(token){
      try {
        await axios.post(`${backendUrl}/api/cart/add`, {itemId, RAM}, {
          headers: {token}})
      } catch (error) {
        console.log(error);
        toast.error("Failed to add item to cart");
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      const RAMOptions = cartItems[itemId];
      for (const RAM in RAMOptions) {
        try {
          if (RAMOptions[RAM] > 0) {
            totalCount += RAMOptions[RAM];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, RAM, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][RAM] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token, navigate]);


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
