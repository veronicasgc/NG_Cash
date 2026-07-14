import { AccountBusiness } from "../../business/AccountBusiness";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import { Authenticator } from "../../services/Authenticator";
import { MissingFields } from "../../error/MissingFields";
import { invalidPassword, invalidUser } from "../../error/UserError";
import { AccountDatabase } from "../../data/AccountDatabase";
import { invalidToken } from "../../error/AuthenticatorError";
import { invalidAccount } from "../../error/AccountError";

//login
describe("Account Business - Login", () => {
  beforeEach(() => {
    jest
      .spyOn(Authenticator.prototype, "generateToken")
      .mockReturnValue("token-fake");
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Should log user and return token", async () => {
    const accountBusiness = new AccountBusiness();
    const input = {
      username: "Veronica",
      password: "Senha123",
    };
    const resultado = await accountBusiness.loginAccount(input);
    expect(resultado).toBe("token-fake");
  });

  test("Should return error when username does not exist", async () => {
    const accountBusiness = new AccountBusiness();
    const input = {
      username: "",
      password: "Senha123",
    };
    const resultado = accountBusiness.loginAccount(input);
    await expect(resultado).rejects.toThrow(MissingFields);
  });

  test("Should return error when password is missing", async () => {
    const accountBusiness = new AccountBusiness();
    const input = {
      username: "Veronica",
      password: "",
    };
    const resultado = accountBusiness.loginAccount(input);
    await expect(resultado).rejects.toThrow(MissingFields);
  });

  test("Should return error when username is invalid", async () => {
    const accountBusiness = new AccountBusiness();
    const input = {
      username: "Alexandra",
      password: "Senha123",
    };
    const resultado = accountBusiness.loginAccount(input);
    await expect(resultado).rejects.toThrow(invalidUser);
  });

  test("Should return error when password is invalid", async () => {
    const accountBusiness = new AccountBusiness();
    const input = {
      username: "Veronica",
      password: "Senha",
    };
    const resultado = accountBusiness.loginAccount(input);
    await expect(resultado).rejects.toThrow(invalidPassword);
  });
});

//accountById

describe("AccountBusiness - AccountById", () => {
  beforeEach(() => {
    jest
      .spyOn(Authenticator.prototype, "getTokenData")
      .mockReturnValue({ id: 123456 });
    jest
      .spyOn(AccountDatabase.prototype, "selectAccountById")
      .mockResolvedValue({
        id: 2,
        balance: 1000,
      });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Should return account data by user logged", async () => {
    const accountBusiness = new AccountBusiness();

    const resultado = await accountBusiness.accountById(2, "token-fake");

    expect(resultado).toEqual({
      id: 2,
      balance: 1000,
    });
  });

  test("Should return error when token does not exist", async () => {
    const accountBusiness = new AccountBusiness();

    const resultado = accountBusiness.accountById(2, "");
    await expect(resultado).rejects.toThrow(invalidToken);
  });
  test("Should return error when account does not exist", async () => {
    jest
      .spyOn(AccountDatabase.prototype, "selectAccountById")
      .mockResolvedValue(undefined);
    const accountBusiness = new AccountBusiness();

    const resultado = accountBusiness.accountById(1, "token-fake");
    await expect(resultado).rejects.toThrow(invalidAccount);
  });
  test("Should return error when token is invalid", async () => {
    jest
      .spyOn(Authenticator.prototype, "getTokenData")
      .mockImplementation((token) => {
        if (token === "token-fake") {
          return { id: 123456 };
        }
        throw new invalidToken();
      });
    const accountBusiness = new AccountBusiness();
    const resultado = accountBusiness.accountById(2, "invalid-token");
    await expect(resultado).rejects.toThrow(invalidToken);
  });
});
