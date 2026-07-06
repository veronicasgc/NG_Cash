import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();


const userController = new UserController()

userRouter.post("/signup", (req,res)=> userController.signup(req,res))
userRouter.get("/",userController.getAllUsers)

