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
    let cartData = userData.cartData || {}; // Initialize if undefined

   

    if (cartData[itemId]) {
      if (cartData[itemId][RAM]) {
        cartData[itemId][RAM] += 1;
      } else {
        cartData[itemId][RAM] = 1;
      }
    } else {
      cartData[itemId] = {
        [RAM]: 1,
      };
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true }); // Return updated document

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

    if (!userId || !itemId || !RAM || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};


    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][RAM] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

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
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, updateCart, getUserCart };
