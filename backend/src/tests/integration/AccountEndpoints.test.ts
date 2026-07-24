import request from "supertest";
import { app } from "../../app";
import { describe, expect, test, beforeEach, beforeAll } from "@jest/globals";
import { MissingFields } from "../../error/MissingFields";
import { invalidPassword, invalidUser } from "../../error/UserError";
import { invalidAccount } from "../../error/AccountError";
import { invalidId, invalidToken } from "../../error/AuthenticatorError";
import { createTestUser } from "../helpers/createTestUser";
//login
describe("Account - Login", () => {
  test("Should login successfully", async () => {
    const username = `teste_${Date.now()}`;

    await request(app).post("/user/signup").send({
      username,
      password: "Senha123",
    });

    const response = await request(app).post("/account/login").send({
      username,
      password: "Senha123",
    });
    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe("string");
  });
  test("Should return error when username does not exists", async () => {
    const response = await request(app).post("/account/login").send({
      username: "",
      password: "Senha123",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(new MissingFields().message);
  });
  test("Should return error when password does not exists", async () => {
    const response = await request(app).post("/account/login").send({
      username: "Manoel",
      password: "",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe(new MissingFields().message);
  });
  test("Should return error when password is invalid", async () => {
    const response = await request(app).post("/account/login").send({
      username: "Manoel",
      password: "Senha12",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(new invalidPassword().message);
  });
  test("Should return when user not found", async () => {
    const response = await request(app).post("/account/login").send({
      username: "Vania",
      password: "Senha123",
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(new invalidUser().message);
  });
});

//accountId
describe("Account - By ID", () => {
  let token: string;
  let accountId: number;

  beforeEach(async () => {
    const user = await createTestUser();

    token = user.token;
    accountId = user.accountId;
  });
  test("Should find account by user id", async () => {
    const response = await request(app)
      .get("/account")
      .query({ id: accountId })
      .set("Authorization", token);

    expect(response.status).toBe(200);
  });
  test("Should return error when account does not exist", async () => {
    const response = await request(app)
      .get("/account")
      .query({ id: 4324 })
      .set("Authorization", token);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(new invalidAccount().message);
  });
  test("Should return error when token does not exist", async () => {
    const response = await request(app)
      .get("/account")
      .set("Authorization", "");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(new invalidToken().message);
  });
  test("Should return error when token is invalid", async () => {
    const response = await request(app)
      .get("/account")
      .set("Authorization", "token-fake");
    expect(response.status).toBe(400); //BUG-003 - Business Validation Errors Return HTTP 500
    expect(response.body.message).toBe(new invalidToken().message);
  });
});
