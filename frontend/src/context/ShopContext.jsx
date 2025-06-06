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

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const addToCart = async (itemId, RAM) => {
    if (!RAM) {
      toast.error("Please select the RAM");
      return;
    }

    console.log("Adding to cart:", { itemId, RAM });
    console.log("Current cart items:", cartItems);

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

    console.log("Updated cart data:", cartData);
    setCartItems(cartData);

    if (token) {
      try {
        console.log("Sending add to cart request with token:", token);
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, RAM },
          {
            headers: { token },
          }
        );
        console.log("Add to cart response:", response.data);

        // Refresh cart data from server to ensure consistency
        getUserCart();

        toast.success("Item added to cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart");
      }
    } else {
      console.log("No token available, cart only saved locally");
      toast.warning("Sign in to save your cart");
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

    if (quantity === 0) {
      // If quantity is 0, remove the item from the cart
      if (cartData[itemId] && cartData[itemId][RAM]) {
        delete cartData[itemId][RAM];

        // If no more RAM options for this item, remove the entire item
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // Otherwise, update the quantity
      cartData[itemId][RAM] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        console.log("Sending update request:", { itemId, RAM, quantity });
        const response = await axios.put(
          `${backendUrl}/api/cart/update`,
          { itemId, RAM, quantity },
          {
            headers: { token },
          }
        );
        console.log("Update response:", response.data);
      } catch (error) {
        console.log("Error updating cart:", error);
        toast.error("Failed to update cart");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    // If products or cartItems are not loaded yet, return 0
    if (!products.length || !Object.keys(cartItems).length) {
      return totalAmount;
    }

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      // Skip if product not found
      if (!itemInfo) {
        console.log(`Product with ID ${items} not found in products list`);
        continue;
      }

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.error(`Error calculating amount for ${items}:${item}`, error);
        }
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

  const getUserCart = async () => {
    if (token) {
      try {
        console.log("Fetching cart data with token:", token);
        const response = await axios.get(`${backendUrl}/api/cart/get`, {
          headers: { token },
        });
        console.log("Cart API response:", response.data);

        if (response.data.success) {
          if (
            response.data.cartData &&
            typeof response.data.cartData === "object"
          ) {
            console.log("Setting cart items:", response.data.cartData);
            setCartItems(response.data.cartData);
          } else {
            console.log(
              "Cart data is not a valid object, initializing empty cart"
            );
            setCartItems({});
          }
        } else {
          console.log("API returned success: false");
          toast.error(response.data.message || "Failed to fetch cart data");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        // Don't show error toast on network issues to avoid annoying the user
        if (error.response) {
          toast.error(
            "Failed to fetch cart data: " +
              (error.response.data?.message || "Unknown error")
          );
        }
      }
    } else {
      console.log("No token available, skipping cart fetch");
    }
  };

  // Load products first
  useEffect(() => {
    getProductsData();
  }, []);

  // Handle token and cart data
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else if (token) {
      // Make sure products are loaded before getting cart
      if (products.length > 0) {
        getUserCart();
      }
    }
  }, [token, products]);

  // Add a separate effect to refresh cart data when navigating
  useEffect(() => {
    if (token && products.length > 0) {
      getUserCart();
    }
  }, [navigate]);

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
    getUserCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
