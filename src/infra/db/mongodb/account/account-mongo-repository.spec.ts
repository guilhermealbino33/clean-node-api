import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account-mongo-repository";

let accountCollection: Collection;

describe("Account Mongo Repository", () => {
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  const mockAddAccountParams = () => ({
    name: "any_name",
    email: "any_email@email.com",
    password: "any_password",
  });

  test("Should return an account on add success", async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@email.com");
    expect(account.password).toBe("any_password");
  });

  test("Should return an account on loadByEmail success", async () => {
    const sut = makeSut();
    accountCollection.insertOne({
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    });
    const account = await sut.loadByEmail("any_email@email.com");

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@email.com");
    expect(account.password).toBe("any_password");
  });

  test("Should return null if loadByEmail fails", async () => {
    const sut = makeSut();
    const account = await sut.loadByEmail("any_email@email.com");
    expect(account).toBeFalsy();
  });

  // test("Should update the account accessToken on success", async () => {

  // MONGO ATUALIZOU E NÂO USA MAIS O res.ops[0]

  //   const sut = makeSut();
  //   const res = await accountCollection.insertOne(mockAddAccountParams());
  //   const fakeAccount = await accountCollection.findOne({
  //     _id: res.insertedId,
  //   });
  //   expect(fakeAccount.accessToken).toBeFalsy();
  //   await sut.updateAccessToken(fakeAccount._id, "any_token");
  //   const account = await accountCollection.findOne({ _id: fakeAccount._id });
  //   expect(account).toBeTruthy();
  //   expect(account.accessToken).toBe(accessToken);
  // });
});
