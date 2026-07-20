import { BaseError } from "./BaseError";

export class InvalidTransaction extends BaseError {
    constructor() {
        super(404, "Has no transaction")
    }
}

export class InsufficientFunds extends BaseError {
  constructor() {
    super(400, "Insufficient funds");
  }
}

export class DebitedAccountInvalid extends BaseError {
  constructor(){
    super(404, "Debited account not found")
  }
}

export class CreditedAccountInvalid extends BaseError {
  constructor(){
    super(404, "Credited account not found")
  }
}

export class InvalidValue extends BaseError{
  constructor(){
    super(400, "Invalid transaction value")
  }
}

export class InvalidBalance extends BaseError{
  constructor(){
    super(400, "Invalid stored balance")
  }
}

export class InvalidDate extends BaseError{
  constructor(){
    super(400, "Date not validated")
  }
}