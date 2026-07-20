import { BaseError } from "../error/BaseError";
import { MissingFields } from "../error/MissingFields";
import { invalidName, invalidPassword, invalidUserRegister } from "../error/UserError";
import { User, SignupInputDTO } from "../models/user";
import { UserDatabase } from "../data/UserDatabase";
import { AccountDatabase } from "../data/AccountDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { AccountInputDTO } from "../models/account";

export class UserBusiness {
    async signup(signup: SignupInputDTO) {
      
            const { username, password } = signup;

            if (!username || !password) {
                throw new MissingFields()
            }

            if (username.length < 3) {
                throw new invalidName()
            }

            if (password.length < 8) {
                throw new invalidPassword()
            }
           
            let r: any = /^(?=(?:.?[A-Z]){1})(?=(?:.?[0-9]){1})/;
                       
          
            const userDatabase = new UserDatabase()
            const findUsername = await userDatabase.findUsername(username);

            if (findUsername) {
                throw new invalidUserRegister();
            }
            const hashManager = new HashManager()
            const hashPassword = await hashManager.hash(password)
            const id = new IdGenerator().generateId()


            const accountDatabase = new AccountDatabase()


            const newAccount: AccountInputDTO = {
                id: id,
                balance: 100
            }

            const newSignup: User = {
                id,
                username,
                password: hashPassword,
                accountid: newAccount.id
            }
            await accountDatabase.createAccount(newAccount)
            await userDatabase.signup(newSignup)

            const authenticator = new Authenticator()
            const accessToken = authenticator.generateToken({ id })
          
            return accessToken

         
    }
    async getAllUsers(){
        const userDatabase = new UserDatabase()
        const users = await userDatabase.getAllUsers()
        return users
    }
   
}