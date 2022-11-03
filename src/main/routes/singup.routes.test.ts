/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";
import app from "../config/app";

describe("SingUp Routes", () => {
  test("Should return an account on success", async () => {
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
