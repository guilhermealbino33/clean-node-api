/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogErrorRepository } from "../../data/protocols/log-error-repository";
import { serverError } from "../../presentation/helpers/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocols";
import { LogControllerDecorator } from "./log";

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStubStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {}
  }
  return new LogErrorRepositoryStubStub();
};

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          name: "any_name",
          email: "any_email@email.com",
          password: "any_password",
          passwordConfirmation: "any_password",
        },
      };

      return httpResponse;
    }
  }
  return new ControllerStub();
};

interface SutTypes {
  controllerStub: Controller;
  sut: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  );

  return {
    controllerStub,
    logErrorRepositoryStub,
    sut,
  };
};

describe("LogController Decorator", () => {
  test("Should call controller handle", async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, "handle");

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test("Should return the same result of the controller", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: "any_name",
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    });
  });

  test("Should call LogErrorRepository with correct error if controller returns a server error", async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const fakeError = new Error();
    fakeError.stack = "any_stack";
    const error = serverError(fakeError);
    const logSpy = jest.spyOn(logErrorRepositoryStub, "log");

    jest
      .spyOn(controllerStub, "handle")
      .mockReturnValueOnce(new Promise((resolve) => resolve(error)));

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    await sut.handle(httpRequest);

    await sut.handle(httpRequest);
    expect(logSpy).toHaveBeenCalledWith("any_stack");
  });
});
