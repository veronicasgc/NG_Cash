import { BaseDatabase } from "./BaseDatabase"
import { TransactionInputDTO } from "../models/transactions"
import { BaseError } from "../error/BaseError"


export class TransactionsDatabase extends BaseDatabase {

    private static TABLE_NAME = "transactions"
    async insertTransaction(transaction: TransactionInputDTO): Promise<void> {

    await TransactionsDatabase.connection
      .insert(transaction)
      .into(TransactionsDatabase.TABLE_NAME)

 
}


    async getTransaction(id: number) {
        
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

       

    }
    async findTransactionByDate(createdat: string, id: number) {
 

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


}
}