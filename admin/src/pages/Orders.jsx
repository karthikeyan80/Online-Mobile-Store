import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const orderStatuses = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const fetchAllOrders = async () => {
    if (!token) {
      setLoading(false);
      setError("No authentication token found");
      toast.error("No authentication token found");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("=== Fetching Orders ===");
      console.log("Backend URL:", backendUrl);
      console.log("Token:", token);

      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.data.success) {
        const ordersData = response.data.orders || [];
        console.log("Orders data received:", ordersData);
        setOrders(ordersData);
        toast.success(
          response.data.message || `Found ${ordersData.length} orders`
        );
      } else {
        setError(response.data.message || "Failed to fetch orders");
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: `${backendUrl}/api/order/list`,
      });
      setError(error.response?.data?.message || "Error fetching orders");
      toast.error(error.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (!token) {
      toast.error("No authentication token found");
      return;
    }

    try {
      setUpdatingOrderId(orderId);
      console.log("Updating order status:", { orderId, newStatus });

      // Optimistically update the UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: newStatus,
        },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Status update response:", response.data);

      if (response.data.success) {
        toast.success("Order status updated successfully");
      } else {
        // Revert the optimistic update if the request failed
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: order.status } : order
          )
        );
        toast.error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      // Revert the optimistic update if the request failed
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: order.status } : order
        )
      );
      console.error("Error updating order status:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      toast.error(
        error.response?.data?.message || "Error updating order status"
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  useEffect(() => {
    console.log("Orders component mounted");
    console.log("Current backendUrl:", backendUrl);
    fetchAllOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[200px]">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Orders</h2>
          <button
            onClick={fetchAllOrders}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
          >
            Retry
          </button>
        </div>
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p className="text-sm mt-2">Backend URL: {backendUrl}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Orders</h2>
        <button
          onClick={fetchAllOrders}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
        >
          Refresh
        </button>
      </div>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium">
                    Order #{order._id.substring(0, 8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                  {order.userId && (
                    <p className="text-sm text-gray-500">
                      User: {order.userId.email || order.userId.name || "N/A"}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{order.amount}</p>
                  <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : order.status === "Processing"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  disabled={updatingOrderId === order._id}
                  className={`text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    updatingOrderId === order._id
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {orderStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {updatingOrderId === order._id && (
                  <span className="text-sm text-gray-500">Updating...</span>
                )}
              </div>

              <div className="border-t pt-3">
                <h4 className="font-medium mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      {item.image && (
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">
                          Quantity: {item.quantity} | RAM: {item.RAM}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t mt-3 pt-3">
                <h4 className="font-medium mb-2">Delivery Address:</h4>
                <p className="text-sm text-gray-600">
                  {order.address.firstName} {order.address.lastName}
                  <br />
                  {order.address.street}
                  <br />
                  {order.address.city}, {order.address.state}{" "}
                  {order.address.zipcode}
                  <br />
                  {order.address.country}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
