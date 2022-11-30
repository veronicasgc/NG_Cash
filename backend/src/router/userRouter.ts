import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();


const userController = new UserController()

userRouter.post("/signup",  userController.signup)
userRouter.get("/",userController.getAllUsers)

// userRouter.get("/get", userController.getTokenUser)
