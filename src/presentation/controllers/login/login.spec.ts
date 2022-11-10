import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { EmailValidator } from "../singup/singup-protocols";
import { LoginController } from "./login";

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

interface SutTypes {
  sut: LoginController;
  makeEmailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  const makeEmailValidatorStub = makeEmailValidator();
  const sut = new LoginController(makeEmailValidatorStub);

  return {
    sut,
    makeEmailValidatorStub,
  };
};

describe("Login Controller", () => {
  test("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });

  test("Should return 400 if no password is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@email.com",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError("password")));
  });

  test("Should call EmailValidator with correct email", async () => {
    const { sut, makeEmailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(makeEmailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
      },
    };

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("any_email@email.com");
  });
});
