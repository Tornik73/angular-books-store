import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { User, users } from "./user.model";

export default class UserController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const all = await users.findAll({attributes: ['id', 'email', 'password', 'age', 'telephone', 'isAdmin', 'img']});
      res.send(all);
      if (!users) {
        return res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: users
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await users.findOne({ where: { id: req.params.id }});
      
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: user
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const { email, password, isAdmin, telephone, age, img } = req.body;
    try {
      // const userUpdated = await users.findByIdAndUpdate(
      //   { where: { id: req.params.id } },
      //   {
      //     $set: {
      //       email,
      //       password,
      //       isAdmin
      //     }
      //   },
      //   { new: true }
      // );
      const userUpdated = await users.findOne({ where: { id: req.params.id } });
      userUpdated.update(
        { email, 
          password, 
          telephone,
          age,
          img,
          isAdmin 
        },
        { where: { 
          id: req.params.id  
          }
        });
      if (!userUpdated) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: userUpdated
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await users.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      // try catch mb
      res.status(200).send({success: true, message: 'User delete'});
      user.destroy();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
