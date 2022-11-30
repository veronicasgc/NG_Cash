import {app} from './app';
import { accountRouter } from './router/accountRouter';
import { userRouter } from './router/userRouter';
import{transactionsRouter} from './router/transactionsRouter';

app.use("/user", userRouter)
app.use("/account", accountRouter)
app.use("/transaction", transactionsRouter)
