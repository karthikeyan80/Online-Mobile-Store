import express from "express";
import { loginUser,registerUser , adminLogin  } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

export default userRouter;
// This code sets up an Express router for user-related routes, allowing for user registration, login, and admin login functionalities.