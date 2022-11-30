import { BaseError } from "./BaseError";

export class MissingFields extends BaseError {
    constructor() {
        super(401, "Missing fields to complet")
    }
} 