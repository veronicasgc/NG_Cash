import { BaseDatabase } from "./BaseDatabase"
import { CashOut, CashIn, Transactions } from "../models/transactions"
import { BaseError } from "../error/BaseError"


export class TransactionsDatabase extends BaseDatabase {

    private static TABLE_NAME = "transactions_ngcash"
    async insertTransaction(transaction: Transactions): Promise<any> {
        try {
            await TransactionsDatabase.connection
                .insert(transaction)
                .into(TransactionsDatabase.TABLE_NAME)

            await TransactionsDatabase.connection.raw(`UPDATE accounts_ngcash 
                SET balance = balance - ${transaction.value} 
                WHERE id = ${transaction.debitedaccountid}`);

            await TransactionsDatabase.connection.raw(`UPDATE accounts_ngcash 
                SET balance = balance + ${transaction.value} 
                WHERE id = ${transaction.creditedaccountid}`)

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
                    'createdat',
                    'username' as 'whoTransferred')
                .where({ "transactions_ngcash.debitedaccountid": id })
                .join("accounts_ngcash", "accounts_ngcash.id", "transactions_ngcash.debitedaccountid")
                .leftJoin("users_ngcash", "accounts_ngcash.id", "users_ngcash.accountid")
                .into(TransactionsDatabase.TABLE_NAME)

            return result

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }

    }
    async findTransactionByDate(createdat: string, id: number) {
        try {
            const result = await TransactionsDatabase.connection.raw(`
            SELECT debitedaccountid, creditedaccountid, value,createdat
            FROM transactions_ngcash
            WHERE createdat = '${createdat}'
            AND debitedaccountid = ${id} OR creditedaccountid = ${id}

        `)


            return result.rows

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }
    }
}