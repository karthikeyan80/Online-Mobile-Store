import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success && response.data.orders) {
        setOrderData(response.data.orders);
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 my-8 ">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div
              key={index}
              className="py-3 my-2 border-t border-b-gray-500 text-gray-600"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">
                  Order #{order._id.substring(0, 8)}
                </p>
                <p className="text-sm">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{order.status}</p>
              </div>

              {order.items.map((item, itemIndex) => {
                // Find product details if available
                const productDetails = item.productDetails || {};

                return (
                  <div
                    key={itemIndex}
                    className="py-3 my-2 border-t border-b-gray-500 text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex items-start gap-6 text-sm">
                      {productDetails.image && (
                        <img
                          src={productDetails.image[0]}
                          alt="item_image"
                          className="w-16 sm:w-20"
                        />
                      )}
                      <div>
                        <p className="sm:text-base font-medium">
                          {productDetails.name || `Product ID: ${item._id}`}
                        </p>
                        <div className="flex items-center gap-3 text-base text-gray-700">
                          <p className="text-lg">
                            {currency}
                            {item.price || productDetails.price}
                          </p>
                          <p>QUANTITY: {item.quantity || 1}</p>
                          <p>RAM: {item.RAM || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-between items-center mt-2">
                <p className="font-medium">
                  Total: {currency}
                  {order.amount}
                </p>
                <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No orders found. Start shopping to place your first order!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
