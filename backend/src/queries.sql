-- ACCOUNTS
CREATE TABLE accounts (
    id BIGSERIAL PRIMARY KEY,
    balance NUMERIC(15,2) NOT NULL DEFAULT 100.00
);

-- USERS
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    accountid BIGINT NOT NULL,
    FOREIGN KEY (accountid) REFERENCES accounts(id)
);

-- TRANSACTIONS
CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    debitedaccountid BIGINT NOT NULL,
    creditedaccountid BIGINT NOT NULL,
    value NUMERIC(15,2) NOT NULL,
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (debitedaccountid) REFERENCES accounts(id),
    FOREIGN KEY (creditedaccountid) REFERENCES accounts(id)
);
