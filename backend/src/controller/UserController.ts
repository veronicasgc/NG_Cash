import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { SignupInputDTO, UserToken } from "../models/user";

export class UserController {
    async signup (req: Request, res: Response) {
        try { 
            const {username, password} = req.body;

            const signup: SignupInputDTO = {
                username,
                password
            }
            
            const userBusiness = new UserBusiness()
            const token = await userBusiness.signup(signup)
         
            res.status(200).send({
                message: "Successfully registered user!",
                token
                             
            })
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
    async getAllUsers(req: Request, res: Response){
        try {
            const userBusiness = new UserBusiness()
           
            const users = await userBusiness.getAllUsers()
            
            res.status(200).send(users)

        } catch (error: any) {
            res.status(400).send(error.message)
        }
       
    }
    async getTokenUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const userBusiness = new UserBusiness()
           
            const users = await userBusiness.getTokenUser(id)
            
            res.status(200).send(users)

        } catch (error: any) {
            res.status(400).send(error.message)
        }
       
    }
}