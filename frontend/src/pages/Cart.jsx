import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import assets from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              RAM: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 mt-4 ">
      <div className="text-2xl mb-3 mt-8 ">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            // Skip rendering if product not found
            if (!productData) {
              console.log(
                `Product with ID ${item._id} not found in products list`
              );
              return null;
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-600 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 "
              >
                <div className="flex items-start gap-6">
                  {productData.image && productData.image.length > 0 ? (
                    <img
                      className="w-16 sm:w-20"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                  ) : (
                    <div className="w-16 sm:w-20 h-16 bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">No image</span>
                    </div>
                  )}
                  <div>
                    <p className="text-xs sm:text-lg text-gray-500 font-medium">
                      {productData.name}
                    </p>

                    <div className="flex items-center gap-3 ">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-1 sm:px-3 sm:py-2 border text-sm bg-slate-50 ">
                        {item.RAM}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.RAM,
                          Number(e.target.value)
                        )
                  }
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="border max-w-10 px-2 sm:max-w-20 sm:py-2 py-2"
                />
                <img
                  onClick={() => updateQuantity(item._id, item.RAM, 0)}
                  src={assets.bin_icon}
                  className="w-4 mr-4 sm:ml-2 sm:w-5 cursor-pointer"
                />
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>Your cart is empty. Start shopping to add items to your cart!</p>
          </div>
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() => navigate("place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
