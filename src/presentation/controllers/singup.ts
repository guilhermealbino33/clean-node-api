export class SingUpController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        body: new Error("Missing param: name"),
        statusCode: 400,
      };
    }
    if (!httpRequest.body.email) {
      return {
        body: new Error("Missing param: e-mail"),
        statusCode: 400,
      };
    }
  }
}
