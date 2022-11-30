import express from "express";
import { TransactionsController } from "../controller/TransactionsController";

export const transactionsRouter = express.Router();


const transactionsController = new TransactionsController()

transactionsRouter.post("/add",  transactionsController.createTransaction)
transactionsRouter.get("/",  transactionsController.getTransactions)
transactionsRouter.get("/date",  transactionsController.findTransactionByDate)

