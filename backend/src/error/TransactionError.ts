import { BaseError } from "./BaseError";

export class invalidTransaction extends BaseError {
    constructor() {
        super(404, "Has no transaction")
    }
}