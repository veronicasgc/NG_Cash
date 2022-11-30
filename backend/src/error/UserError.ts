import { BaseError } from "./BaseError";

export class invalidName extends BaseError {
    constructor() {
        super(415, "Invalid username! Must be at least 3 characters")
    }
}

export class invalidPassword extends BaseError {
    constructor() {
        super(400, "Invalid password! Must be at least 8 characters. A number and a capital letter")
    }
}

export class invalidUserRegister extends BaseError {
    constructor() {
        super(404, "This username is already registered")
    }
}

export class invalidUser extends BaseError {
    constructor() {
        super(404, "User is not registered")
    }
}