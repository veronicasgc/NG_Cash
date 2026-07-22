import request from "supertest";
import { app } from "../../app";
import { describe, expect, test } from "@jest/globals";
import {
  invalidName,
  invalidPassword,
  invalidUserRegister,
} from "../../error/UserError";
import { MissingFields } from "../../error/MissingFields";

//signup
describe("User - Signup", () => {
  test("Should create user successfully", async () => {
    const username = `teste_${Date.now()}`;

    const response = await request(app).post("/user/signup").send({
      username,
      password: "Senha123",
    });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Successfully registered user!");
    expect(typeof response.body.token).toBe("string");
  });
  test("Should return error when username is empty", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "",
      password: "Senha123",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(new MissingFields().message);
  });
  test("Should return error when password is empty", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Veronica",
      password: "",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(new MissingFields().message);
  });
  test("Should return error when password is less than 8 characters", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Veronica",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(new invalidPassword().message);
  });
  test("Should return error when username is less than 3 characters", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Ve",
      password: "Senha123",
    });

    expect(response.status).toBe(415);
    expect(response.body.message).toBe(new invalidName().message);
  });
  test("Should return error when username is already registered", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Veronica",
      password: "Senha123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(new invalidUserRegister().message);
  });
  test("Should return error when password without a capital letter", async () => {
    const username = `teste_${Date.now()}_1`;
    const response = await request(app).post("/user/signup").send({
      username,
      password: "senha123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(new invalidPassword().message); //BUG-005 - Password policy validation is incomplete during user signup
  });
  test("Should return error when password without a number", async () => {
    const username = `teste_${Date.now()}_2`;
    const response = await request(app).post("/user/signup").send({
      username,
      password: "Senhaaaa",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(new invalidPassword().message); //BUG-005 - Password policy validation is incomplete during user signup
  });
});

//getAllUsers
describe("User - GetAllUsers", () => {
  test("Should return all users", async () => {
    const response = await request(app).get("/user/");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
