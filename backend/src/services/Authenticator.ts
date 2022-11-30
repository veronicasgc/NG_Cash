import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../models/user";
import dotenv from "dotenv"

dotenv.config()

export class Authenticator {
  public generateToken = (payload: AuthenticationData): any => {
    const token = jwt.sign(payload,
      process.env.JWT_KEY as any,
      { expiresIn: "24h" });
    
    return token;
  };

  public getTokenData = (token: any): AuthenticationData => {

    const payload = jwt.verify(token, process.env.JWT_KEY as any) as jwt.JwtPayload
    const result: AuthenticationData = { id: payload.id }

    return result
  }
}