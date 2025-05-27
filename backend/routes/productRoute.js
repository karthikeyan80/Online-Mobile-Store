import express from "express";
import {
  listProduct,
  addProduct,
  singleProduct,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list", listProduct);
productRouter.delete("/remove", removeProduct);
productRouter.get("/single", singleProduct);

export default productRouter;
// This code sets up an Express router for product-related routes, allowing for adding, listing, removing, and retrieving single product information functionalities.
