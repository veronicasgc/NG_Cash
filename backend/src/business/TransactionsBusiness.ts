import { TransactionsDatabase } from "../data/TransactionsDatabase";
import { BaseError } from "../error/BaseError";
import { MissingFields } from "../error/MissingFields";
import { TransactionInputDTO, Transactions } from "../models/transactions";
import { IdGenerator } from "../services/IdGenerator";
import {
  invalidAuthenticatorData,
  invalidToken,
} from "../error/AuthenticatorError";
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

      const authenticatorData = new Authenticator().getTokenData(token);

      if (!authenticatorData.id) {
        throw new invalidAuthenticatorData();
      }

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

      console.log("DebitedAccount:", debitedAccount);
      console.log("Balance raw:", debitedAccount?.balance);
      console.log("Type of balance:", typeof debitedAccount?.balance);

      // 🔥 Conversão segura
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

      // ✅ Atualiza saldos
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
      if (!authenticatorData.id) {
        throw new invalidAuthenticatorData();
      }
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

      const authenticatorData = new Authenticator().getTokenData(token);

      if (!authenticatorData.id) {
        throw new invalidAuthenticatorData();
      }
      if (!id || isNaN(id) || id.toString().length !== 13) {
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
