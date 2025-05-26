import express from "express";
import { listProduct , addProduct, singleProduct , removeProduct } from "../controllers/productController.js"; 

const productRouter = express.Router();

productRouter.post('/add', addProduct);
productRouter.get('/list', listProduct);    
productRouter.get('/remove', removeProduct);
productRouter.get('/single', singleProduct);

export default productRouter;
// This code sets up an Express router for product-related routes, allowing for adding, listing, removing, and retrieving single product information functionalities.