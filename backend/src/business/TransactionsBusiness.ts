import { TransactionsDatabase } from "../data/TransactionsDatabase"
import { BaseError } from "../error/BaseError";
import { MissingFields } from "../error/MissingFields";
import { TransactionInputDTO, Transactions } from "../models/transactions";
import { IdGenerator } from "../services/IdGenerator";
import { invalidAuthenticatorData, invalidToken } from "../error/AuthenticatorError";
import { Authenticator } from "../services/Authenticator";
import { invalidTransaction } from "../error/TransactionError";
import { AccountDatabase } from "../data/AccountDatabase";



export class TransactionsBusiness {
  async createTransaction(input: TransactionInputDTO, token: string) {
    try {
      const { debitedaccountid, creditedaccountid, value, createdat } = input

      if (!token) {
        throw new invalidToken()
      }

      if (!debitedaccountid || !creditedaccountid || !value || !createdat) {
        throw new MissingFields()
      }
      const authenticatorData = new Authenticator().getTokenData(token)

      if (!authenticatorData.id) {
        throw new invalidAuthenticatorData()
      }

      const id = new IdGenerator().generateId()
 
      const transaction: Transactions = {
        id,
        debitedaccountid,
        creditedaccountid,
        value,
        createdat
      }
      const trasactionDatabase = new TransactionsDatabase()
      await trasactionDatabase.insertTransaction(transaction)


      const accountDatabase = new AccountDatabase()

      return transaction

    } catch (error: any) {
      throw new BaseError(error.statusCode, error.sqlMessage || error.message);
    }
  }
  async getTrasaction(id: number, token: string) {
    try {
      if (!token) {
        throw new invalidToken()
      }
      const authenticatorData = new Authenticator().getTokenData(token)

      if (!id) {
        throw new Error("Please provide a id to access the user transactions")
      }

      if (!authenticatorData.id) {
        throw new invalidAuthenticatorData()
      }
      const trasactionDatabase = new TransactionsDatabase()
      const transaction = await trasactionDatabase.getTransaction(authenticatorData.id)

      if (!transaction) {
        throw new invalidTransaction()
      }

      return transaction

    } catch (error: any) {
      throw new BaseError(error.statusCode, error.sqlMessage || error.message);
    }
  }
  async findTransactionByDate(createdat: string, token: string, id: number) {
    try {

      if (!token) {
        throw new invalidToken()
      }
   
      if (!createdat) {
        throw new Error("Date not validated")
      }
      const authenticatorData = new Authenticator().getTokenData(token)
      
      if (!authenticatorData.id) {
        throw new invalidAuthenticatorData()
      }
      const trasactionDatabase = new TransactionsDatabase()
      const transactionByDate = await trasactionDatabase.findTransactionByDate(createdat, id)


      if (!transactionByDate) {
        throw new invalidTransaction()
      }

      return transactionByDate

    } catch (error: any) {
      throw new BaseError(error.statusCode, error.sqlMessage || error.message);
    }
  }
}
