import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../presentation/helpers/validators";
import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidator } from "../../../presentation/protocols/email-validator";
import { makeSingUpValidation } from "./singup-validation-factory";

jest.mock("../../../presentation/helpers/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(input: any): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe("SingUpValidation Factory", () => {
  test("Shod call ValidationComposite with all all validations", () => {
    makeSingUpValidation();
    const validations: Validation[] = [];

    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );
    validations.push(new EmailValidation("email", makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
