import { AccountBusiness } from "../business/AccountBusiness"
import { Request, Response } from "express"
import { LoginAccount } from "../models/account"
import { invalidAccount } from "../error/AccountError"


export class AccountController {

    async loginAccount(req: Request, res: Response) {
        try {
            const { username, password } = req.body

            const login: LoginAccount = {
                username,
                password
            }
            const accountBusiness = new AccountBusiness()
            const token = await accountBusiness.loginAccount(login)

            res.status(200).send({ token })


        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
    async accountById(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string
            const { id } = req.query as any

            const accountBusiness = new AccountBusiness()
            const account = await accountBusiness.accountById(id, token)

           
            res.status(200).send(account)

        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
}