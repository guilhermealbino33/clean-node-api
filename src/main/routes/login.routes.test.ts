/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import app from "../config/app";

describe("Login Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection("accounts");
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
});
