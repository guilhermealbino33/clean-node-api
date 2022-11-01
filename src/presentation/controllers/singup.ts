import { MissingParamError } from "../errors/missing-param-error";
import { HttpRequest, HttpResponse } from "./protocols/http";

export class SingUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError("name"),
      };
    }
    if (!httpRequest.body.email) {
      return {
        body: new MissingParamError("email"),
        statusCode: 400,
      };
    }
  }
}
