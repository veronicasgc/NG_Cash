import express from 'express';
import { AccountController } from '../controller/AccountController';


export const accountRouter = express.Router();

const accountController = new AccountController()

accountRouter.post("/login",  accountController.loginAccount)
accountRouter.get("/", accountController.accountById)
// accountRouter.put("update", accountController.updateBalance)