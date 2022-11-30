import {Request, Response} from 'express';
import moment from 'moment';
import { TransactionsBusiness } from '../business/TransactionsBusiness';
import { FindTransaction, TransactionInputDTO } from '../models/transactions';

export class TransactionsController {
    async createTransaction(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string

            const {debitedaccountid, creditedaccountid, value, createdat } = req.body

            const transaction: TransactionInputDTO = {
                debitedaccountid, 
                creditedaccountid, 
                value,
                createdat
                             
            }
            const transactionsBusiness = new TransactionsBusiness()
            await transactionsBusiness.createTransaction(transaction, token)

            res.status(201).send({ message: "Transaction registered successfully!" })

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
    async getTransactions(req: Request, res: Response) {
        try {
            
            const token = req.headers.authorization as string
            const id  = Number(req.query.id)

            const transactionsBusiness = new TransactionsBusiness()
            const transaction = await transactionsBusiness.getTrasaction(id, token)
                   
            res.status(200).send(transaction)
            
        }catch (error: any) {
            res.status(500).send(error.message)
        }
}
async findTransactionByDate(req: Request, res: Response) {
    try{ 
        const token = req.headers.authorization as string
        const createdat  = req.query.createdat as string
        const id = Number(req.query.id)

        const transactionsBusiness = new TransactionsBusiness()
        const transactionByDate = await transactionsBusiness.findTransactionByDate(createdat, token, id)
        
        console.log(createdat)
        res.status(200).send(transactionByDate)
    
    }catch (error: any) {
        res.status(400).send(error.message)
    }
}
}