import { BaseDatabase } from "./BaseDatabase";
import { AccountInputDTO, UpdateBalance} from "../models/account";
import { BaseError } from "../error/BaseError";

export class AccountDatabase extends BaseDatabase {
    private static TABLE_NAME = "accounts"

    async createAccount(account: AccountInputDTO): Promise<any> {
       
            await AccountDatabase.connection
            .insert({
                id: account.id,
                balance: 100
            })
            .into(AccountDatabase.TABLE_NAME)

        
    }
    async selectAccountById(id: number): Promise<any>{
    
            const [account] = await AccountDatabase.connection
                .select("id", "balance")
                .where({id})
                .into(AccountDatabase.TABLE_NAME)

                return account

       
    }

    async updateBalance(id: number, newBalance: number): Promise<void> {
      
    await AccountDatabase.connection
      .update({ balance: newBalance })
      .where({ id })
      .into(AccountDatabase.TABLE_NAME)

 
}

   
}