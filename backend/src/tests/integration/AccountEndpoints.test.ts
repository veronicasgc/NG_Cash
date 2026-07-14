import request from "supertest";
import { app } from "../../app";
import { describe, expect, test, beforeEach } from "@jest/globals";

//login
describe("Account - Login", () => {
  test("Should login successfully", async () => {
    const response = await request(app).post("/account/login").send({
      username: "Manoel",
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
    expect(response.body.message).toBe("Missing fields to complete");
  });
  test("Should return error when password does not exists", async () => {
    const response = await request(app).post("/account/login").send({
      username: "Manoel",
      password: "",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Missing fields to complete");
  });
  test("Should return error when password is invalid", async () => {
    const response = await request(app).post("/account/login").send({
      username: "Manoel",
      password: "Senha12",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid password! Must be at least 8 characters. A number and a capital letter",
    );
  });
  test("Should return when user not found", async () => {
    const response = await request(app).post("/account/login").send({
      username: "Vania",
      password: "Senha123",
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User is not registered");
  });
});

//accountId
describe("Account - By ID", () => {
  let token: string;
  beforeEach(async () => {
    const login = await request(app).post("/account/login").send({
      username: "Manoel",
      password: "Senha123",
    });

    token = login.body.token;
  });
  test("Should find account by user id", async () => {
    const response = await request(app)
      .get("/account")
      .query({ id: 1783367341294 })
      .set("Authorization", token);

    expect(response.status).toBe(200);
  });
  test("Should return error when account does not exist", async () => {
    const response = await request(app)
      .get("/account")
      .query({ id: 4324 })
      .set("Authorization", token);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Has no account");
  });
  test("Should return error when token does not exist", async () => {
    const response = await request(app)
      .get("/account")
      .set("Authorization", "");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Tokem needs to be passed in headers");
  });
  test("Should return error when token is invalid", async () => {
    const response = await request(app)
      .get("/account")
      .set("Authorization", "token-fake");
    expect(response.status).toBe(400); //BUG-003 - Business Validation Errors Return HTTP 500
    expect(response.body.message).toBe("Unauthorized user");
  });
});
