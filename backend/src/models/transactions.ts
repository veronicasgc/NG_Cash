export type Transactions = {
    id: number,
    debitedaccountid: number,
    creditedaccountid: number,
    value: number,
    createdat: Date
}



export interface TransactionInputDTO {
    debitedaccountid: number,
    creditedaccountid: number,
    value: number,
    createdat: Date
   
}

//FAZER CASH IN E CASHOUT??
export interface CashIn {
    creditedaccountid: number,
    value: number,
    username:string
}

export interface CashOut {
    debitedaccountid: number,
    value: number,
    username:string
}

export interface FindTransaction{
    createdat: any
}

