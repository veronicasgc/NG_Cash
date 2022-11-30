export interface User  {
    id: number,
    username: string,
    password: string,
    accountid: number
}

export interface SignupInputDTO {
    username: string,
    password: string
}

export interface AuthenticationData {
    id: any
}

export interface UserToken extends User{
    token: string
}