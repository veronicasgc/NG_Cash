import { BaseError } from "./BaseError";

export class invalidTransaction extends BaseError {
    constructor() {
        super(404, "Has no transaction")
    }
}

export class InsufficientFunds extends BaseError {
  constructor() {
    super(400, "Insufficient funds");
  }
}