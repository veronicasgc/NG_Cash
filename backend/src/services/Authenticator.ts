import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../models/user";
import dotenv from "dotenv"
import { invalidToken } from "../error/AuthenticatorError";

dotenv.config()

export class Authenticator {
  public generateToken (payload: AuthenticationData): string  {
    const token = jwt.sign(payload,
      process.env.JWT_KEY as any,
      { expiresIn: "24h" });
    
    return token;
  };

  public getTokenData  (token: string): AuthenticationData  {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string) as jwt.JwtPayload;

      return {
        id: payload.id,
      };
    } catch {
      throw new invalidToken();
    }
  }
}
                                                  