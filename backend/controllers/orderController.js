import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
///placing order usinng cash on delivery

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Cash on Delivery",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// placing order using stripe payment gateway

const placeOrderStripe = async (req, res) => {};

//placinf order using razorpay payment gateway

const placeOrderRazorpay = async (req, res) => {};

//All orders data for admin panel

const allOrders = async (req, res) => {
  try {
    console.log("=== All Orders Request ===");
    console.log("Headers:", req.headers);
    console.log("Token:", req.headers.token);

    // First, get all orders without population to check if they exist
    const orders = await orderModel.find({}).sort({ date: -1 });

    console.log("Orders found:", orders.length);

    if (!orders || orders.length === 0) {
      console.log("No orders found in database");
      return res.status(200).json({
        success: true,
        orders: [],
        message: "No orders found",
      });
    }

    // Now populate the user details
    const populatedOrders = await orderModel
      .find({})
      .populate({
        path: "userId",
        select: "name email",
        model: "User",
      })
      .sort({ date: -1 });

    if (populatedOrders.length > 0) {
      console.log("First order sample:", {
        id: populatedOrders[0]._id,
        userId: populatedOrders[0].userId,
        items: populatedOrders[0].items,
        amount: populatedOrders[0].amount,
        status: populatedOrders[0].status,
      });
    }

    // Transform the orders to ensure all required fields are present
    const transformedOrders = populatedOrders.map((order) => {
      const orderObj = order.toObject();
      return {
        ...orderObj,
        items: orderObj.items.map((item) => ({
          ...item,
          image: item.image || [],
          name: item.name || "Unknown Product",
          RAM: item.RAM || "N/A",
        })),
      };
    });

    res.status(200).json({
      success: true,
      orders: transformedOrders,
      message: `Successfully fetched ${transformedOrders.length} orders`,
    });
  } catch (error) {
    console.error("Error in allOrders:", error);
    // Send more detailed error information
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
    });
  }
};

//user orders data for frontend

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//update order status from admin panel

const updateStatus = async (req, res) => {
  try {
    console.log("=== Status Update Request ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const { orderId, status } = req.body;

    if (!orderId || !status) {
      console.log("Missing required fields:", { orderId, status });
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    // Validate status
    const validStatuses = [
      "Order Placed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];

    if (!validStatuses.includes(status)) {
      console.log("Invalid status value:", status);
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // First find the order to ensure it exists
    const existingOrder = await orderModel.findById(orderId);
    if (!existingOrder) {
      console.log("Order not found:", orderId);
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log("Current order status:", existingOrder.status);

    // Update the order status directly
    existingOrder.status = status;
    await existingOrder.save();

    console.log("Order status updated successfully:", {
      orderId,
      oldStatus: existingOrder.status,
      newStatus: status,
    });

    // Verify the update
    const verifiedOrder = await orderModel.findById(orderId);
    console.log("Verified order status:", verifiedOrder.status);

    if (verifiedOrder.status !== status) {
      console.log("Status verification failed:", {
        expected: status,
        actual: verifiedOrder.status,
      });
      return res.status(500).json({
        success: false,
        message: "Status update verification failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: verifiedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
