import { Router } from "express";
import { adaptRoute } from "../adapters/express-routes-adapter";
import { makeSingUpController } from "../factories/singup/singup-factory";

export default (router: Router): void => {
  router.post("/singup", adaptRoute(makeSingUpController()));
};
