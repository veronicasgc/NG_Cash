import request from "supertest";
import { app } from "../../app";
import { UserDatabase } from "../../data/UserDatabase";

export const createTestUser = async () => {
  const username = `user_${Date.now()}`;
  const password = "Senha123";

  await request(app).post("/user/signup").send({
    username,
    password,
  });

  const login = await request(app).post("/account/login").send({
    username,
    password,
  });

  const token = login.body.token;

  const userDatabase = new UserDatabase();

  const user = await userDatabase.findByUsername(username);

  if (!user) {
    throw new Error("Usuário de teste não foi criado.");
  }

  return {
    token,
    username,
    password,
    userId: user!.id,
    accountId: user!.accountid,
  };
};
