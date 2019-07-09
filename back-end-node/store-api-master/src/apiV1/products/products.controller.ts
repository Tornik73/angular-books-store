import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { Product } from "./products.model";
import { ProductService } from "../../services/productsService";

export default class ProductsController {
  public getProducts = async (req: Request, res: Response): Promise<any> => {
    try {
      var page = req.body.page;
      var products = await new ProductService().getProducts(page | 0);
      res.status(200).send({
        success: true,
        data: products
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public addProduct = async (req: Request, res: Response): Promise<any> => {
    try {
      var product: Product = req.body;
      await new ProductService().addProduct(product);
      res.status(200).send({
        success: true
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
