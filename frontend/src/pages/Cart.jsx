import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import assets from "../assets/assets";

const Cart = () => {
  const { products, currency, cartItems , updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
  for (const items in cartItems) {
    for (const item in cartItems[items]) {
      if (cartItems[items][item] > 0) {
        tempData.push({
          _id: items,
          RAM: item,
          quantity: cartItems[items][item]
        });
      }
    }
  }
  setCartData(tempData);
  }, [cartItems]);
  

  return <div className="border-t pt-14 mt-4 ">
    <div className="text-2xl mb-3 mt-8 ">
      <Title text1={'YOUR'} text2={'CART'}/>

    </div>

    <div >
      {
        cartData.map((item ,  index)=>{
          const productData = products.find((product)=>product._id === item._id)

          return(
            <div key={index} className="py-4 border-t border-b text-gray-600 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 ">
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20 " src={productData.image[0] }/>
                <div>
                  <p className="text-xs sm:text-lg text-gray-500 font-medium">{productData.name}</p>

                  <div className="flex items-center gap-3 ">
                    <p>{currency}{productData.price}</p>
                    <p className="px-1 sm:px-3 sm:py-2 border text-sm bg-slate-50 ">{item.RAM}</p>

                  </div>
                </div>

              </div>
              <input onChange={(e)=>e.target.value === '' || e.target.value === '0'? null : updateQuantity(item._id,item.RAM,Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className="border max-w-10 px-2 sm:max-w-20 sm:py-2 py-2" />
              <img onClick={()=>updateQuantity(item._id,item.RAM,0)} src={assets.bin_icon} className="w-4 mr-4 sm:ml-2 sm:w-5 cursor-pointer"/>
              </div>
          )
        })
      }

    </div>

  </div>;
};

export default Cart;
