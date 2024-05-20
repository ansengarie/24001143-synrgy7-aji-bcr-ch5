import { Response, Request } from "express";

import { UsersModel } from "../databases/models/users";
import { ResponseHelper } from "../helpers/response.helper";
import { hashPassword } from "../utils/hash.password";

export class UsersController extends ResponseHelper {
  register = async (request: Request, response: Response) => {
    try {
      const passwordHashed = (await hashPassword(
        request.body.passwordp
      )) as string;

      const user = await UsersModel.query().insert({
        ...request.body,
        password: passwordHashed,
      });

      return this.success("Data ditambahkan", user, 200)(response);
    } catch (error: Error | any) {
      this.error(error.message, null, 404)(response);
    }
  };
}
