import request from "supertest";
import { app } from "../../app";
import { describe, expect, test } from "@jest/globals";
import { invalidName, invalidPassword, invalidUserRegister } from "../../error/UserError";
import { MissingFields } from "../../error/MissingFields";

//signup
describe("User - Signup", () => {
  test("Should create user successfully", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Márcia",
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
    expect(response.body.message).toBe(MissingFields);
  });
  test("Should return error when password is empty", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Veronica",
      password: "",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(MissingFields);
  });
  test("Should return error when password is less than 8 characters", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Veronica",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      invalidPassword
    );
  });
  test("Should return error when username is less than 3 characters", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Ve",
      password: "Senha123",
    });

    expect(response.status).toBe(415);
    expect(response.body.message).toBe(
      invalidName
    );
  });
  test("Should return error when username is already registered", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Veronica",
      password: "Senha123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(invalidUserRegister);
  });
   test("Should return error when password without a capital letter", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Julia",
      password: "senha123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      invalidPassword
    );  //BUG-005 - Password policy validation is incomplete during user signup
  });
    test("Should return error when password without a number", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "Julia",
      password: "Senhaaaa",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      invalidPassword
    ); //BUG-005 - Password policy validation is incomplete during user signup
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
