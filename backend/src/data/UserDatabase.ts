import { BaseDatabase } from "./BaseDatabase";
import { User, UserToken } from "../models/user";
import { BaseError } from "../error/BaseError";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "users_ngcash"

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
        const users = await UserDatabase.connection(UserDatabase.TABLE_NAME).select()
        return users
        
    }
    async transferUsername(username: string) {
        try {
            const user = await UserDatabase.connection
                .select()
                .where({username})
                .join("accounts_ngcash","accounts_ngcash.accountid", "users_ngcash.id")
                .into(UserDatabase.TABLE_NAME)


                return user[0]

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message)
        }
    }
    async getTokenUser(id: number) {
        try {
            const tokenUser = await UserDatabase.connection
               .select("token")
               .where({"users_ngcash.id":id})
               .into(UserDatabase.TABLE_NAME)

               return tokenUser
               
    } catch (error: any) {
    throw new BaseError(error.statusCode, error.sqlMessage || error.message)
}
    }
}