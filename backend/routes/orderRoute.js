import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//Admin features
orderRouter.post("/list", adminAuth, allOrders);

//payment features
orderRouter.post("/place", authUser, placeOrder);

//user features
orderRouter.post("/user", authUser, userOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
