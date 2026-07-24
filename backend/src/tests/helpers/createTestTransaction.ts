import request from "supertest";
import { app } from "../../app";
import { createTestUser } from "./createTestUser";
import { AccountDatabase } from "../../data/AccountDatabase";

export const createTestTransaction = async () => {
  const sender = await createTestUser();
  const receiver = await createTestUser();

  const token = sender.token;

  const senderAccountId = sender.accountId;
  const receiverAccountId = receiver.accountId;

  const accountDatabase = new AccountDatabase();

  await accountDatabase.updateBalance(senderAccountId, 10000);
  await accountDatabase.updateBalance(receiverAccountId, 10000);

  const now = new Date();

  const today = now.toISOString().split("T")[0];

  const response = await request(app)
    .post("/transaction/add")
    .set("Authorization", token)
    .send({
      debitedaccountid: senderAccountId,
      creditedaccountid: receiverAccountId,
      value: 10,
      createdat: today,
    });

  return {
    token,
    senderAccountId,
    receiverAccountId,
    createdAt: today,
    response,
  };
};
