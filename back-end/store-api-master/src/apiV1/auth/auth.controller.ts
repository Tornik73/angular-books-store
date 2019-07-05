import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { User } from "../users/user.model";
import { AuthService } from "../../services/authService";

export default class UserController {
  public authenticate = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    try {
      const user = await new AuthService().getUserByEmail(email);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found"
        });
      }
      const matchPasswords = await bcrypt.compare(password, user.password);
      if (!matchPasswords) {
        return res.status(401).send({
          success: false,
          message: "Not authorized"
        });
      }
      const token = await jwt.sign(
        { email, isAdmin: user.isAdmin },
        config.JWT_ENCRYPTION,
        {
          expiresIn: config.JWT_EXPIRATION
        }
      );
      res.status(200).send({
        success: true,
        userID: user.id,
        message: "Token generated Successfully",
        data: token
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };

  public register = async (req: Request, res: Response): Promise<any> => {
    
    const user: User = {
      id: null,
      email: req.body.email,
      isAdmin: false,
      password: await bcrypt.hash(req.body.password, config.SALT_ROUNDS),
      img: req.body.img,
      telephone: req.body.telephone,
      age: req.body.age
    };
    try {
      await new AuthService().register(user);
      res.status(200).send({
        success: false,
        message: "User Successfully created",
        data: user
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.errors[0].message
      });
    }
  };
}
