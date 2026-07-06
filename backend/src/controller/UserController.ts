import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { SignupInputDTO } from "../models/user";

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      
      const { username, password } = req.body;

      const signup: SignupInputDTO = {
        username,
        password,
      };

      const userBusiness = new UserBusiness();
      const token = await userBusiness.signup(signup);

      res.status(200).send({
        message: "Successfully registered user!",
        token,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({
        message: error.message,
      });
    }
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const userBusiness = new UserBusiness();

      const users = await userBusiness.getAllUsers();

      res.status(200).send(users);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
 
}
