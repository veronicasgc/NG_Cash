import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import { UserBusiness } from "../../business/UserBusiness";
import { UserDatabase } from "../../data/UserDatabase";
import { HashManager } from "../../services/HashManager";
import { AccountDatabase } from "../../data/AccountDatabase";
import { Authenticator } from "../../services/Authenticator";
import { invalidName, invalidPassword } from "../../error/UserError";
import { MissingFields } from "../../error/MissingFields";
import { IdGenerator } from "../../services/IdGenerator";

//signup

describe("UserBusiness - Signup", () => {
  beforeEach(() => {
    jest.spyOn(HashManager.prototype, "hash").mockResolvedValue("hash-fake");
    jest.spyOn(IdGenerator.prototype, "generateId").mockReturnValue(123456);
    jest
      .spyOn(Authenticator.prototype, "generateToken")
      .mockReturnValue("token-fake");
    jest
      .spyOn(UserDatabase.prototype, "findUsername")
      .mockResolvedValue(undefined);
    jest.spyOn(UserDatabase.prototype, "signup").mockResolvedValue(undefined);
    jest
      .spyOn(AccountDatabase.prototype, "createAccount")
      .mockResolvedValue(undefined);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.skip("Should throw error when username is missing", async () => {
    const userBusiness = new UserBusiness();

    const input = {
      username: "",
      password: "Senha123",
    };

    await expect(userBusiness.signup(input)).rejects.toThrow(MissingFields);
  });
  test.skip("Should throw error when password is missing", async () => {
    const userBusiness = new UserBusiness();
    const input = {
      username: "Veronica",
      password: "",
    };
    await expect(userBusiness.signup(input)).rejects.toThrow(MissingFields);
  });

   test("Should create user when username equals 3 characters", async () => {
    const userBusiness = new UserBusiness();

    const input = {
      username: "Ang",
      password: "Senha123",
    };
    const resultado = await userBusiness.signup(input);

    expect(resultado).toBe("token-fake");
  });

   test.skip("Should throw error when username smaller than 3 characters", async () => {
    const userBusiness = new UserBusiness();
    const input = {
      username: "Ve",
      password: "Senha123",
    };
    await expect(userBusiness.signup(input)).rejects.toThrow(invalidName);
  });

   test.skip("Should throw error when password smaller than 8 characters", async () => {
    const userBusiness = new UserBusiness();
    const input = {
      username: "Veronica",
      password: "Senha12",
    };
    await expect(userBusiness.signup(input)).rejects.toThrow(invalidPassword);
  });

   test("Should create user", async () => {
    const userBusiness = new UserBusiness();
    const input = {
      username: "Veronica",
      password: "Senha123",
    };
    const resultado = await userBusiness.signup(input);
    expect(resultado).toBe("token-fake");
  });
});

//getAllUsers

describe("UserBusiness - Get Users", () => {
  beforeEach(() => {
    jest.spyOn(UserDatabase.prototype, "getAllUsers").mockResolvedValue([
      {
        id: 123456,
        username: "Veronica",
        accountid: 2,
      },
    ]);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Should return all users", async () => {
    const userBusiness = new UserBusiness();
    const resultado = await userBusiness.getAllUsers();
    expect(resultado).toEqual([
      {
        id: 123456,
        username: "Veronica",
        accountid: 2,
      },
    ]);
  });
});

