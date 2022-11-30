import { AccountDatabase } from "../data/AccountDatabase";
import { MissingFields } from "../error/MissingFields";
import { LoginAccount } from "../models/account";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { invalidPassword, invalidUser } from "../error/UserError";
import { BaseError } from "../error/BaseError";
import { invalidAuthenticatorData, invalidToken } from "../error/AuthenticatorError";
import { invalidAccount } from "../error/AccountError";

export class AccountBusiness {

    async loginAccount(login: LoginAccount) {
        try {
            const { username, password } = login

            if (!username || !password) {
                throw new MissingFields()
            }
            const userDatabase = new UserDatabase()
            const user = await userDatabase.findUsername(username)

            if (!user) {
                throw new invalidUser()
            }

            const hashManager = new HashManager()
            const passwordIsCorrect:boolean = await hashManager.compare(
                password,
                user.password,
               
            );
                
            if (!passwordIsCorrect) {
                throw new invalidPassword()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken({ id: user.id })
           
            return token

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message);
        }
    }
    async accountById(id: number, token: string) {
        try {
            if (!token) {
                throw new invalidToken()
            }

            const authenticator = new Authenticator().getTokenData(token)
            if (!authenticator.id) {
                throw new invalidAuthenticatorData()
            }
            const accountDatabase = new AccountDatabase()
            const account = await accountDatabase.selectAccountById(id)

            if (!account) {
                throw new invalidAccount()
            }
            return account

        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message);
        }
    }
}