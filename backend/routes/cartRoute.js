import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const catrRouter = express.Router();

catrRouter.post("/add", authUser, addToCart);
catrRouter.put("/update",authUser, updateCart);
catrRouter.get("/get",authUser, getUserCart);

export default catrRouter;
