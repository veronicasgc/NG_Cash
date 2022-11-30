-- Active: 1669040381436@@localhost@5432@NG_Cash
CREATE TABLE Users_NGCASH (
    id BIGINT PRIMARY KEY  ,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL ,
    accountId BIGINT NOT NULL ,
    FOREIGN KEY (accountId) REFERENCES Accounts_NGCASH(id)
);

CREATE TABLE Accounts_NGCASH (
    id BIGINT PRIMARY KEY  ,
   balance DECIMAL DEFAULT 100
);

CREATE TABLE Transactions_NGCASH (
    id BIGINT PRIMARY KEY  ,
    debitedAccountId BIGINT NOT NULL ,
    creditedAccountId BIGINT NOT NULL,
    value BIGINT NOT NULL,
    createdAt DATE NOT NULL,
    FOREIGN KEY (debitedAccountId) REFERENCES Accounts_NGCASH(id),
    FOREIGN KEY (creditedAccountId) REFERENCES Accounts_NGCASH(id)
);

SELECT * FROM accounts_ngcash
WHERE id = 1669378931533 
JOIN transactions_ngcash ON transactions_ngcash.debitedAccountId = accounts_ngcash.id

