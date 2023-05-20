import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "../../helpers/http/http-helper";
import {
  Controller,
  Validation,
  Authentication,
  HttpRequest,
  HttpResponse,
} from "./login-controller-protocols";

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {
    this.validation = validation;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      const { email, password } = httpRequest.body;

      if (error) {
        return badRequest(error);
      }

      const accessToken = await this.authentication.auth({
        email,
        password,
      });

      if (!accessToken) {
        return unauthorized();
      }

      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
