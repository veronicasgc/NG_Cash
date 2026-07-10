import { TransactionsDatabase } from "../data/TransactionsDatabase";
import { BaseError } from "../error/BaseError";
import { MissingFields } from "../error/MissingFields";
import { TransactionInputDTO } from "../models/transactions";
import { invalidToken } from "../error/AuthenticatorError";
import { Authenticator } from "../services/Authenticator";
import {
  invalidTransaction,
  InsufficientFunds,
} from "../error/TransactionError";
import { AccountDatabase } from "../data/AccountDatabase";

export class TransactionsBusiness {
  async createTransaction(input: TransactionInputDTO, token: string) {
    try {
      const { debitedaccountid, creditedaccountid, value, createdat } = input;

      if (!token) {
        throw new invalidToken();
      }

      if (!debitedaccountid || !creditedaccountid || !value || !createdat) {
        throw new MissingFields();
      }

      new Authenticator().getTokenData(token);

      const accountDatabase = new AccountDatabase();

      const debitedAccount =
        await accountDatabase.selectAccountById(debitedaccountid);

      if (!debitedAccount) {
        throw new Error("Debited account not found");
      }

      const creditedAccount =
        await accountDatabase.selectAccountById(creditedaccountid);

      if (!creditedAccount) {
        throw new Error("Credited account not found");
      }

      const currentBalance = Number(debitedAccount.balance);
      const creditedBalance = Number(creditedAccount.balance);
      const transactionValue = Number(value);

      if (isNaN(currentBalance) || isNaN(creditedBalance)) {
        throw new Error("Invalid stored balance");
      }

      if (isNaN(transactionValue) || transactionValue <= 0) {
        throw new Error("Invalid transaction value");
      }

      if (currentBalance < transactionValue) {
        throw new InsufficientFunds();
      }

      await accountDatabase.updateBalance(
        debitedaccountid,
        currentBalance - transactionValue,
      );

      await accountDatabase.updateBalance(
        creditedaccountid,
        creditedBalance + transactionValue,
      );

      const transactionDatabase = new TransactionsDatabase();

      const transaction: TransactionInputDTO = {
        debitedaccountid,
        creditedaccountid,
        value: transactionValue,
        createdat,
      };

      await transactionDatabase.insertTransaction(transaction);

      return transaction;
    } catch (error: any) {
      throw new BaseError(error.statusCode || 500, error.message);
    }
  }

  async getTrasaction(id: number, token: string) {
    try {
      if (!token) {
        throw new invalidToken();
      }

      if (!id || isNaN(id)) {
        throw new Error("Invalid or incomplete id");
      }

      const authenticatorData = new Authenticator().getTokenData(token);

      if (Number(authenticatorData.id) !== Number(id)) {
        throw new Error("Unauthorized access");
      }
      const trasactionDatabase = new TransactionsDatabase();
      const transaction = await trasactionDatabase.getTransaction(id);

      if (!transaction || transaction.length === 0) {
        throw new invalidTransaction();
      }

      return transaction;
    } catch (error: any) {
      throw new BaseError(error.statusCode, error.sqlMessage || error.message);
    }
  }

  async findTransactionByDate(createdat: string, token: string, id: number) {
    try {
      if (!token) {
        throw new invalidToken();
      }

      if (!createdat) {
        throw new Error("Date not validated");
      }

      new Authenticator().getTokenData(token);

      if (!id || isNaN(id)) {
        throw new Error("Invalid or incomplete id");
      }
      const trasactionDatabase = new TransactionsDatabase();
      const transactionByDate = await trasactionDatabase.findTransactionByDate(
        createdat,
        id,
      );

      if (!transactionByDate || transactionByDate.length === 0) {
        throw new invalidTransaction();
      }

      return transactionByDate;
    } catch (error: any) {
      throw new BaseError(error.statusCode, error.sqlMessage || error.message);
    }
  }
}
