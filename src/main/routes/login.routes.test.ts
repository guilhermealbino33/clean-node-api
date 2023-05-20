/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import { Collection } from "mongodb";
import { hash } from "bcrypt";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import app from "../config/app";

let accountCollection: Collection;

describe("Login Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");
    accountCollection.deleteMany({});
  });

  describe("POST /singup", () => {
    test("Should return 200 on singup", async () => {
      await request(app)
        .post("/api/singup")
        .send({
          name: "any_name",
          email: "any_email@email.com",
          password: "any_password",
          passwordConfirmation: "any_password",
        })
        .expect(200);
    });
  });

  describe("POST /login", () => {
    beforeEach(async () => {
      accountCollection.deleteMany({});
    });

    test("Should return 200 on login", async () => {
      const password = await hash("any_password", 12);

      await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@email.com",
        password,
      });

      await request(app)
        .post("/api/login")
        .send({
          name: "any_name",
          email: "any_email@email.com",
          password: "any_password",
        })
        .expect(200);
    });

    test("Should return 401 on login", async () => {
      await request(app)
        .post("/api/login")
        .send({
          name: "any_name",
          email: "any_email@email.com",
          password: "any_password",
        })
        .expect(401);
    });
  });
});
