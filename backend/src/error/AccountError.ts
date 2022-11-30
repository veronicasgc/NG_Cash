import { BaseError } from "./BaseError";

export class invalidAccount extends BaseError {
    constructor() {
        super(404, "Has no account")
    }
}