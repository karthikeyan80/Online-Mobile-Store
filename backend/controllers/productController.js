import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function to add a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, RAM, brand, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => {
      return item !== undefined;
    });
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price,
      RAM: (() => {
        try {
          return RAM ? JSON.parse(RAM) : "";
        } catch {
          return RAM || "";
        }
      })(),

      brand,
      bestseller: Boolean(bestseller),
      image: imagesUrl,
      date: new Date().getTime(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.status(200).json({
      message: "Product added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// function to listt product
const listProduct = async (req, res) => {
  try {
    
    const products = await productModel.find({});
    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      products,
    });

  } catch (error) {
     res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// function to remove product
const removeProduct = async (req, res) => {

  try {
      await productModel.findByIdAndDelete(req.body.id);
      res.status(200).json({
        message: "Product removed successfully",
        success: true,
      });

} catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }

};

// function for single product info
const singleProduct = async (req, res) => {

  try {
    const {productId} = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      product,
    });


  } catch (error) {
     res.status(500).json({
      message: error.message,
      success: false,
    });
  }

};

export { addProduct, listProduct, removeProduct, singleProduct };
