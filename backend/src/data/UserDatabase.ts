import { BaseDatabase } from "./BaseDatabase";
import { User} from "../models/user";
import { BaseError } from "../error/BaseError";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "users"

    async signup(user: User) {
        try {
            await UserDatabase.connection
            .insert(user)
            .into(UserDatabase.TABLE_NAME)

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }
    }
    async findUsername(username: string) {
        try {
            const user = await UserDatabase.connection
                .select()
                .where({username})
                .into(UserDatabase.TABLE_NAME)

                return user[0]

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }
    }
    async getAllUsers(){
        const users = await UserDatabase.connection(UserDatabase.TABLE_NAME).select("id", "username", "accountid")
        return users
        
    }
    async transferUsername(username: string) {
        try {
            const user = await UserDatabase.connection
                .select()
                .where({username})
                .join("accounts","accounts.accountid", "users.id")
                .into(UserDatabase.TABLE_NAME)


                return user[0]

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }
    }
  
}