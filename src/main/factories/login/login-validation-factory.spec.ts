/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../presentation/helpers/validators";
import { EmailValidator } from "../../../presentation/protocols/email-validator";
import { Validation } from "../../../presentation/protocols/validation";
import { makeLoginValidation } from "./login-validation-factory";

jest.mock("../../../presentation/helpers/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(input: any): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe("LoginValidation Factory", () => {
  test("Shod call ValidationComposite with all all validations", () => {
    makeLoginValidation();
    const validations: Validation[] = [];

    for (const field of ["email", "password"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new EmailValidation("email", makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
