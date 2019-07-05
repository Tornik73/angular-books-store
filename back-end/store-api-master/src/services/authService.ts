import { users, User } from "../apiV1/users/user.model";
import * as Sequelize from "sequelize";
import sequelize from "../config/db.connection";

export class AuthService {
  public async getUserByEmail(email: string) {
    var user = (await users.findOne({
      where: { email: email }
    })) as User;
    if (user) return user;
  }

  public async register(user: User) {
    await users.create(user);
  }

}
