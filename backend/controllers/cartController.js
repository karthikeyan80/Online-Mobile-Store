//add products to user cart

import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, RAM } = req.body;

    console.log("Add to cart request:", { userId, itemId, RAM });

    if (!userId || !itemId || !RAM) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find the user and ensure they exist
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Initialize cartData if it doesn't exist or is not an object
    let cartData = userData.cartData || {};
    if (typeof cartData !== "object" || cartData === null) {
      cartData = {};
    }

    console.log("Before update, cartData:", JSON.stringify(cartData));

    // Ensure RAM is properly handled as a string key
    const ramKey = String(RAM);
    const itemIdStr = String(itemId);

    // Update the cart data
    if (!cartData[itemIdStr]) {
      cartData[itemIdStr] = {};
    }

    if (cartData[itemIdStr][ramKey]) {
      cartData[itemIdStr][ramKey] += 1;
    } else {
      cartData[itemIdStr][ramKey] = 1;
    }

    console.log("After update, cartData:", JSON.stringify(cartData));

    // Update the user's cart data in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData: cartData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to update cart data",
      });
    }

    console.log("User cart updated successfully");

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//update products in user cart

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, RAM, quantity } = req.body;

    console.log("Update Cart Request:", { userId, itemId, RAM, quantity });

    if (!userId || !itemId || !RAM || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};
    console.log("Before update, cartData:", JSON.stringify(cartData));

    // Ensure RAM is properly handled as a string key
    const ramKey = String(RAM);

    if (quantity === 0) {
      console.log("Deleting item from cart:", { itemId, ramKey });
      // If quantity is 0, remove the item from the cart
      if (cartData[itemId] && cartData[itemId][ramKey]) {
        delete cartData[itemId][ramKey];

        // If no more RAM options for this item, remove the entire item
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // Otherwise, update the quantity
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][ramKey] = quantity;
    }

    console.log("After update, cartData:", JSON.stringify(cartData));

    // Update the user's cart data in the database using findByIdAndUpdate
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData: cartData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to update cart data",
      });
    }

    console.log("Updated user document:", result);

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get user cart data

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    console.log("Get user cart request for userId:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find the user with the given ID
    const userData = await userModel.findById(userId);
    console.log("Found user:", userData ? userData._id : "User not found");

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Ensure cartData is always an object, even if it's null or undefined in the database
    let cartData = userData.cartData || {};

    // If cartData is not an object (e.g., it's null), initialize it as an empty object
    if (typeof cartData !== "object" || cartData === null) {
      cartData = {};
    }

    console.log("Retrieved cart data for user:", userId);
    console.log("Cart data:", JSON.stringify(cartData));

    // Return the cart data
    res.status(200).json({
      success: true,
      cartData,
      message: "Cart data retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, updateCart, getUserCart };
