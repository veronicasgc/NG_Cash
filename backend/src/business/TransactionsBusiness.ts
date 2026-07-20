import { TransactionsDatabase } from "../data/TransactionsDatabase";
import { MissingFields } from "../error/MissingFields";
import { TransactionInputDTO } from "../models/transactions";
import { invalidToken, invalidId } from "../error/AuthenticatorError";
import { Authenticator } from "../services/Authenticator";
import {
  InvalidTransaction,
  InsufficientFunds,
  DebitedAccountInvalid,
  CreditedAccountInvalid, InvalidValue, InvalidBalance, InvalidDate
} from "../error/TransactionError";
import { AccountDatabase } from "../data/AccountDatabase";

export class TransactionsBusiness {
  async createTransaction(input: TransactionInputDTO, token: string) {
    
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
        throw new DebitedAccountInvalid();
      }

      const creditedAccount =
        await accountDatabase.selectAccountById(creditedaccountid);

      if (!creditedAccount) {
        throw new CreditedAccountInvalid();
      }

      const currentBalance = Number(debitedAccount.balance);
      const creditedBalance = Number(creditedAccount.balance);
      const transactionValue = Number(value);

      if (isNaN(currentBalance) || isNaN(creditedBalance)) {
        throw new InvalidBalance();
      }

      if (isNaN(transactionValue) || transactionValue <= 0) {
        throw new InvalidValue();
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
   
  }

  async getTrasaction(id: number, token: string) {
   
      if (!token) {
        throw new invalidToken();
      }

      if (!id || isNaN(id)) {
        throw new invalidId();
      }

      const authenticatorData = new Authenticator().getTokenData(token);

      if (Number(authenticatorData.id) !== Number(id)) {
        throw new invalidId();
      }
      const trasactionDatabase = new TransactionsDatabase();
      const transaction = await trasactionDatabase.getTransaction(id);

      if (!transaction || transaction.length === 0) {
        throw new InvalidTransaction();
      }

      return transaction;
   
  }

  async findTransactionByDate(createdat: string, token: string, id: number) {
    
      if (!token) {
        throw new invalidToken();
      }

      if (!createdat) {
        throw new InvalidDate();
      }

      new Authenticator().getTokenData(token);

      if (!id || isNaN(id)) {
        throw new invalidId();
      }
      const trasactionDatabase = new TransactionsDatabase();
      const transactionByDate = await trasactionDatabase.findTransactionByDate(
        createdat,
        id,
      );

      if (!transactionByDate || transactionByDate.length === 0) {
        throw new InvalidTransaction();
      }

      return transactionByDate;
   
  }
}
