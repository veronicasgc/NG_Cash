export type Account = {
    id: number
    
}

export interface AccountInsert extends Account{
    balance: number
}

export interface AccountInputDTO {
    id: number,
    balance ?: number
}

export interface LoginAccount {
    username: string,
    password: string
}

// ATUALIZAR BALANCE AO FAZER CASH IN OU CASH OUT
export interface UpdateBalance {
    username: string,
    balance: number
}