import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../presentation/helpers/validators";
import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidatorAdapter } from "../../adapters/validators/email-validator-adapter";
// /utils/email-validator-adapter";

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new CompareFieldsValidation("password", "passwordConfirmation")
  );
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
