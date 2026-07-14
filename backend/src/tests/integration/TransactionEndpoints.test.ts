import request from "supertest";
import { app } from "../../app";
import { describe, test, expect, beforeEach } from "@jest/globals";

//createTransaction
describe("Transactions - Create", () => {
  let token: string;
  beforeEach(async () => {
    const login = await request(app).post("/account/login").send({
      username: "Manoel",
      password: "Senha123",
    });
    token = login.body.token;
  });
  test("Should do transfer successfully", async () => {
    const response = await request(app)
      .post("/transaction/add")
      .send({
        debitedaccountid: 1783367341294,
        creditedaccountid: 1783031061142,
        value: 10,
        createdat: new Date("10/07/2026"),
      })
      .set("Authorization", token);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Transaction registered successfully!");
  });
  test("Should return error when token is invalid", async () => {
    const response = await request(app)
      .post("/transaction/add")
      .send({
        debitedaccountid: 1783367341294,
        creditedaccountid: 1783031061142,
        value: 20,
        createdat: new Date("10/07/2026"),
      })
      .set("Authorization", "token-fake");
    expect(response.status).toBe(400); //BUG-003 - Business Validation Errors Return HTTP 500
    expect(response.body.message).toBe("Tokem needs to be passed in headers");
  });
  test("Should return error when missing fields", async () => {
    const response = await request(app)
      .post("/transaction/add")
      .send({
        debitedaccountid: 1783367341294,
        creditedaccountid: 1783031061142,
        value: 20,
        createdat: "",
      })
      .set("Authorization", token);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Missing fields to complete");
  });
  test("Should return error when debited account does not exist", async () => {
    const response = await request(app)
      .post("/transaction/add")
      .send({
        debitedaccountid: 178336734112,
        creditedaccountid: 1783031061142,
        value: 20,
        createdat: new Date("10/07/2026"),
      })
      .set("Authorization", token);
    expect(response.status).toBe(400); //BUG-003 - Business Validation Errors Return HTTP 500
    expect(response.body.message).toBe("Debited account not found");
  });
  test("Should return error when credited account does not exist", async () => {
    const response = await request(app)
      .post("/transaction/add")
      .send({
        debitedaccountid: 1783367341294,
        creditedaccountid: 1783031061543,
        value: 20,
        createdat: new Date("10/07/2026"),
      })
      .set("Authorization", token);
    expect(response.status).toBe(400); //BUG-003 - Business Validation Errors Return HTTP 500
    expect(response.body.message).toBe("Credited account not found");
  });
 
});

//getTransaction

describe("Transactions - Get",()=>{
  let token: string;
  beforeEach(async () => {
    const login = await request(app).post("/account/login").send({
      username: "Manoel",
      password: "Senha123",
    });
    token = login.body.token;
  });
    test("Should return all transactions user",async()=>{
         const response = await request(app)
         .get("/transaction")
         .query({id:1783367341294})
         .set("Authorization", token)
         expect(response.status).toBe(200)
        
    });
    test("Should return error when id is invalid", async()=>{
        const response = await request(app)
        .get("/transaction")
        .query({id : 1783367341})
        .set("Authorization", token)
        expect(response.status).toBe(400) //BUG-003 - Business Validation Errors Return HTTP 500
        expect(response.body.message).toBe("Unauthorized access")
    });
    test("Should return error when id does not exists", async()=>{
        const response = await request(app)
        .get("/transaction")
        .query({id : ""})
        .set("Authorization", token)
        expect(response.status).toBe(400) //BUG-003 - Business Validation Errors Return HTTP 500
        expect(response.body.message).toBe("Invalid or incomplete id")
    });
    
})

//findTransactionByDate

describe("Transaction - FindByDate", ()=>{
    let token: string;
  beforeEach(async () => {
    const login = await request(app).post("/account/login").send({
      username: "Manoel",
      password: "Senha123",
    });
    token = login.body.token;
  });
    test("Should find transaction by date", async()=>{
        const response =await request(app)
        .get("/transaction/date")
        .query({
            id: 1783367341294,
            createdat: "2026/07/10"
        })
        .set("Authorization", token)
        expect(response.status).toBe(200)
    });
    test("Should return error when date is invalid", async()=>{
        const response = await request(app)
        .get("/transaction/date")
        .query({
            id: 1783367341294,
            createdat: ""
        })
        .set("Authorization", token)
        expect(response.status).toBe(400) //BUG-003 - Business Validation Errors Return HTTP 500
        expect(response.body.message).toBe("Date not validated")
    });
    test("Should return error when id does not exist or invalid", async()=>{
        const response = await request(app)
        .get("/transaction/date")
        .query({
            id: "",
            createdat: "2026/07/10"
        })
        .set("Authorization", token)
        expect(response.status).toBe(400) //BUG-003 - Business Validation Errors Return HTTP 500
        expect(response.body.message).toBe("Invalid or incomplete id")
    });
})