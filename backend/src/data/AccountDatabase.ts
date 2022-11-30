import { BaseDatabase } from "./BaseDatabase";
import { AccountInputDTO, UpdateBalance} from "../models/account";
import { BaseError } from "../error/BaseError";

export class AccountDatabase extends BaseDatabase {
    private static TABLE_NAME = "accounts_ngcash"

    async createAccount(account: AccountInputDTO): Promise<any> {
        try {  
            await AccountDatabase.connection
            .insert({
                id: account.id,
                balance: 100
            })
            .into(AccountDatabase.TABLE_NAME)

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }
    }
    async selectAccountById(id: number): Promise<any>{
        try{
            const account = await AccountDatabase.connection
                .select("id", "balance")
                .where({id})
                .into(AccountDatabase.TABLE_NAME)

                return account

        } catch(error: any){
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }
    }
   
}