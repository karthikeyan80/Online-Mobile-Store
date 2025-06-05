//add products to user cart

import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, RAM } = req.body;

    if (!userId || !itemId || !RAM) {
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

    let cartData = userData.cartData || {}; // Initialize if undefined

    // Ensure RAM is properly handled as a string key
    const ramKey = String(RAM);

    if (cartData[itemId]) {
      if (cartData[itemId][ramKey]) {
        cartData[itemId][ramKey] += 1;
      } else {
        cartData[itemId][ramKey] = 1;
      }
    } else {
      cartData[itemId] = {
        [ramKey]: 1,
      };
    }

    // For a complete replacement of the cartData object, we'll use a different approach
    // First, get the user document (we already have it from earlier)
    userData.cartData = cartData;

    // Save the updated document
    await userData.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
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

    // For a complete replacement of the cartData object, we'll use a different approach
    // First, get the user document
    const user = await userModel.findById(userId);

    // Then update the cartData property
    user.cartData = cartData;

    // Save the updated document
    const result = await user.save();

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

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
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

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, updateCart, getUserCart };
