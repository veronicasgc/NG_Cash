import express from "express";
import { accountRouter } from './router/accountRouter';
import { userRouter } from './router/userRouter';
import{transactionsRouter} from './router/transactionsRouter';

export const app = express();

app.use(express.json());
app.use("/user", userRouter)
app.use("/account", accountRouter)
app.use("/transaction", transactionsRouter)

