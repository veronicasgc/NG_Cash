import { BaseDatabase } from "./BaseDatabase"
import { TransactionInputDTO } from "../models/transactions"
import { BaseError } from "../error/BaseError"


export class TransactionsDatabase extends BaseDatabase {

    private static TABLE_NAME = "transactions"
    async insertTransaction(transaction: TransactionInputDTO): Promise<void> {
  try {
    await TransactionsDatabase.connection
      .insert(transaction)
      .into(TransactionsDatabase.TABLE_NAME)

  } catch (error: any) {
    throw new BaseError(error.statusCode, error.sqlMessage || error.message)
  }
}


    async getTransaction(id: number) {
        try {
            const result = await TransactionsDatabase.connection
                .select('debitedaccountid',
                    'creditedaccountid as receiver',
                    'value',
                     TransactionsDatabase.connection.raw(`TO_CHAR(createdat, 'YYYY-MM-DD') as createdat`),
                    'username' as 'whoTransferred')
                .where({ "transactions.debitedaccountid": id })
                .join("accounts", "accounts.id", "transactions.debitedaccountid")
                .leftJoin("users", "accounts.id", "users.accountid")
                .into(TransactionsDatabase.TABLE_NAME)

            return result

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }

    }
    async findTransactionByDate(createdat: string, id: number) {
  try {

    const result = await TransactionsDatabase.connection
      .select(
        "debitedaccountid",
        "creditedaccountid as receiver",
        "value",
        TransactionsDatabase.connection.raw(
          `TO_CHAR(createdat, 'YYYY-MM-DD') as createdat`
        )
      )
      .from(TransactionsDatabase.TABLE_NAME)
      .whereRaw("DATE(createdat) = ?", [createdat])
      .andWhere(function () {
        this.where("debitedaccountid", id)
            .orWhere("creditedaccountid", id);
      });

    return result;

  } catch (error: any) {
    throw new BaseError(
      error.statusCode || 400,
      error.sqlMessage || error.message
    );
  }
}
}