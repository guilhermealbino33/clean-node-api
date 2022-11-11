import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite";
import { makeSingUpValidation } from "./singup-validation";

jest.mock("../../presentation/helpers/validators/validation-composite");

describe("SingUpValidation Factory", () => {
  test("Shod call ValidationComposite with all all validations", () => {
    makeSingUpValidation();
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation("name"),
      new RequiredFieldValidation("email"),
      new RequiredFieldValidation("password"),
      new RequiredFieldValidation("passwordConfirmation"),
    ]);
  });
});
