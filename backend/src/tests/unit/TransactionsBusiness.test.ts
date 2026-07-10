import { TransactionsBusiness } from "../../business/TransactionsBusiness";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import { TransactionsDatabase } from "../../data/TransactionsDatabase";
import { AccountDatabase } from "../../data/AccountDatabase";
import { Authenticator } from "../../services/Authenticator";
import { invalidToken } from "../../error/AuthenticatorError";
import { MissingFields } from "../../error/MissingFields";
import { TransactionInputDTO } from "../../models/transactions";
import {
  InsufficientFunds,
  invalidTransaction,
} from "../../error/TransactionError";
import { BaseError } from "../../error/BaseError";

//createTansaction

describe("TransactionsBusiness - Create Transaction", () => {
  beforeEach(() => {
    jest
      .spyOn(Authenticator.prototype, "getTokenData")
      .mockImplementation((token) => {
        if (token === "token-fake") {
          return { id: 123456 };
        }
        throw new invalidToken();
      });
    jest
      .spyOn(AccountDatabase.prototype, "selectAccountById")
      .mockImplementation(async (id) => {
        if (id === 2) {
          return {
            id: 2,
            balance: 120,
          };
        }
        if (id === 3) {
          return {
            id: 3,
            balance: 200,
          };
        }
        return undefined;
      });
    jest
      .spyOn(AccountDatabase.prototype, "updateBalance")
      .mockResolvedValue(undefined);
    jest
      .spyOn(TransactionsDatabase.prototype, "insertTransaction")
      .mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Should does transfer successfully", async () => {
    const transactionsBusiness = new TransactionsBusiness();
    const input = {
      debitedaccountid: 2,
      creditedaccountid: 3,
      value: 78,
      createdat: new Date("2025-12-24"),
    };

    const resultado = await transactionsBusiness.createTransaction(
      input,
      "token-fake",
    );
    expect(resultado).toEqual(input);
  });

  test.skip("Should return error when token does not exist", async () => {
    const transactionsBusiness = new TransactionsBusiness();
    const input = {
      debitedaccountid: 2,
      creditedaccountid: 3,
      value: 78,
      createdat: new Date("2025-12-24"),
    };
    const resultado = transactionsBusiness.createTransaction(input, "");
    await expect(resultado).rejects.toThrow(invalidToken);
  });
  test.skip("Should return error when missing fields", async () => {
    const transactionsBusiness = new TransactionsBusiness();
    const input = {
      debitedaccountid: 0,
      creditedaccountid: 3,
      value: 78,
      createdat: new Date("2025-12-24"),
    };
    const resultado = transactionsBusiness.createTransaction(
      input,
      "token-fake",
    );
    await expect(resultado).rejects.toThrow(MissingFields);
  });
  test.skip("Should return error when token is invalid", async () => {
    const transactionsBusiness = new TransactionsBusiness();
    const input = {
      debitedaccountid: 2,
      creditedaccountid: 3,
      value: 78,
      createdat: new Date("2025-12-24"),
    };
    const resultado = transactionsBusiness.createTransaction(
      input,
      "invalid-token",
    );
    await expect(resultado).rejects.toThrow(invalidToken);
  });
  test("Should return error when debitedaccountid is invalid", async () => {
    const transactionsBusiness = new TransactionsBusiness();
    const input = {
      debitedaccountid: 1,
      creditedaccountid: 3,
      value: 78,
      createdat: new Date("2025-12-24"),
    };
    const resultado = transactionsBusiness.createTransaction(
      input,
      "token-fake",
    );
    await expect(resultado).rejects.toThrow("Debited account not found");
  });
  test("Should return error when creditedaccountid is invalid", async () => {
    const transactionsBusiness = new TransactionsBusiness();
    const input = {
      debitedaccountid: 2,
      creditedaccountid: 4,
      value: 78,
      createdat: new Date("2025-12-24"),
    };
    const resultado = transactionsBusiness.createTransaction(
      input,
      "token-fake",
    );
    await expect(resultado).rejects.toThrow("Credited account not found");
  });
  test("Should return error when balance is not a number", async () => {
    jest
      .spyOn(AccountDatabase.prototype, "selectAccountById")
      .mockImplementation(async (id) => {
        if (id === 2) {
          return {
            id: 2,
            balance: "abc",
          };
        }
        if (id === 3) {
          return {
            id: 3,
            balance: 200,
          };
        }
        return undefined;
      });
    const transactionsBusiness = new TransactionsBusiness();
    const input = {
      debitedaccountid: 2,
      creditedaccountid: 3,
      value: 78,
      createdat: new Date("2025-12-24"),
    };
    const resultado = transactionsBusiness.createTransaction(
      input,
      "token-fake",
    );
    await expect(resultado).rejects.toThrow("Invalid stored balance");
  });
  test("Should return error when transactionValue is not a number", async () => {
    const transactionsBusiness = new TransactionsBusiness();
    const input: any = {
      debitedaccountid: 2,
      creditedaccountid: 3,
      value: "abc",
      createdat: new Date("2025-12-24"),
    };
    const resultado = transactionsBusiness.createTransaction(
      input,
      "token-fake",
    );
    await expect(resultado).rejects.toThrow("Invalid transaction value");
  });
  test.skip("Should return error when currentBalance is bigger than transactionValue", async () => {
    jest
      .spyOn(AccountDatabase.prototype, "selectAccountById")
      .mockImplementation(async (id) => {
        if (id === 2) {
          return {
            id: 2,
            balance: 50,
          };
        }
        if (id === 3) {
          return {
            id: 3,
            balance: 200,
          };
        }
        return undefined;
      });
    const transactionsBusiness = new TransactionsBusiness();
    const input = {
      debitedaccountid: 2,
      creditedaccountid: 3,
      value: 78,
      createdat: new Date("2025-12-24"),
    };
    const resultado = transactionsBusiness.createTransaction(
      input,
      "token-fake",
    );
    await expect(resultado).rejects.toThrow(InsufficientFunds);
  });
});

//getTransactions

describe("TransactionsBusiness - Get Transaction", () => {
  beforeEach(() => {
    jest
      .spyOn(Authenticator.prototype, "getTokenData")
      .mockReturnValue({ id: 1 });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test.skip("Should return error when token does not exist", async () => {
    const transactionsBusiness = new TransactionsBusiness();
    const userId = 1;
    const resultado = transactionsBusiness.getTrasaction(userId, "");
    await expect(resultado).rejects.toThrow(invalidToken);
  });
  test("Should return error when id is invalid", async () => {
    const transactionsBusiness = new TransactionsBusiness();
    const userId = NaN;
    const resultado = transactionsBusiness.getTrasaction(userId, "token-fake");
    await expect(resultado).rejects.toThrow("Invalid or incomplete id");
  });
  test("Should return error when token id differs from user id", async () => {
    jest
      .spyOn(Authenticator.prototype, "getTokenData")
      .mockImplementation((token) => {
        if (token) {
          return { id: 123456 };
        }
        throw new invalidToken();
      });
    const transactionsBusiness = new TransactionsBusiness();
    const userId = 1;
    const resultado = transactionsBusiness.getTrasaction(userId, "token-fake");
    await expect(resultado).rejects.toThrow("Unauthorized access");
  });
  test.skip("Should return error when transaction does not exists", async () => {
    jest
      .spyOn(TransactionsDatabase.prototype, "getTransaction")
      .mockResolvedValue([]);
    const transactionsBusiness = new TransactionsBusiness();
    const resultado = transactionsBusiness.getTrasaction(1, "token-fake");
    await expect(resultado).rejects.toThrow(invalidTransaction);
  });
  test("Should return transactions", async () => {
    jest
      .spyOn(TransactionsDatabase.prototype, "getTransaction")
      .mockResolvedValue([
        {
          debitedaccountid: 2,
          creditedaccountid: 3,
          value: 78,
          createdat: new Date("2025-12-24"),
        },
        {
          debitedaccountid: 2,
          creditedaccountid: 3,
          value: 100,
          createdat: new Date("2025-11-12"),
        },
      ]);
    const transactionsBusiness = new TransactionsBusiness();
    const resultado = await transactionsBusiness.getTrasaction(1, "token-fake");
    expect(resultado).toEqual([
      {
        debitedaccountid: 2,
        creditedaccountid: 3,
        value: 78,
        createdat: new Date("2025-12-24"),
      },
      {
        debitedaccountid: 2,
        creditedaccountid: 3,
        value: 100,
        createdat: new Date("2025-11-12"),
      },
    ]);
  });
});

describe("Transactions Business - Find Transactions By Date", () => {
  beforeEach(() => {
    jest
      .spyOn(Authenticator.prototype, "getTokenData")
      .mockReturnValue({ id: 1 });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.skip("Should return error when token does not exist", async () => {
    const transactionsBusiness = new TransactionsBusiness();

    const resultado = transactionsBusiness.findTransactionByDate(
      "20/04/2026",
      "",
      1
    );

    await expect(resultado).rejects.toThrow(invalidToken);
  });

  test("Should return error when date does not exist", async () => {
    const transactionsBusiness = new TransactionsBusiness();

    const resultado = transactionsBusiness.findTransactionByDate(
      "",
      "token-fake",
      1
    );

    await expect(resultado).rejects.toThrow("Date not validated");
  });

  test("Should return error when id is invalid", async () => {
    const transactionsBusiness = new TransactionsBusiness();

    const resultado = transactionsBusiness.findTransactionByDate(
      "20/04/2026",
      "token-fake",
      0
    );

    await expect(resultado).rejects.toThrow(
      "Invalid or incomplete id"
    );
  });

  test.skip("Should return error when transaction does not exist", async () => {
    jest
      .spyOn(
        TransactionsDatabase.prototype,
        "findTransactionByDate"
      )
      .mockResolvedValue([]);

    const transactionsBusiness = new TransactionsBusiness();

    const resultado = transactionsBusiness.findTransactionByDate(
      "20/04/2026",
      "token-fake",
      1
    );

    await expect(resultado).rejects.toThrow(
      invalidTransaction
    );
  });

  test("Should return transactions by date", async () => {
    jest
      .spyOn(
        TransactionsDatabase.prototype,
        "findTransactionByDate"
      )
      .mockResolvedValue([
        {
          debitedaccountid: 2,
          creditedaccountid: 3,
          value: 78,
          createdat: new Date("2025-12-24"),
        },
        {
          debitedaccountid: 2,
          creditedaccountid: 3,
          value: 10,
          createdat: new Date("2025-12-24"),
        },
      ]);

    const transactionsBusiness = new TransactionsBusiness();

    const resultado =
      await transactionsBusiness.findTransactionByDate(
        "20/04/2026",
        "token-fake",
        1
      );

    expect(resultado).toEqual([
      {
        debitedaccountid: 2,
        creditedaccountid: 3,
        value: 78,
        createdat: new Date("2025-12-24"),
      },
      {
        debitedaccountid: 2,
        creditedaccountid: 3,
        value: 10,
        createdat: new Date("2025-12-24"),
      },
    ]);
  });
});
