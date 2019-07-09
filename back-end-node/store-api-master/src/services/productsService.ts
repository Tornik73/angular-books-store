import CONFIG from "../config/config";
import { Product } from "../apiV1/products/products.model";
import conn from "../config/db.connection";
import to from "await-to-js";
import * as Sequelize from "sequelize";
import sequelize from "../config/db.connection";

import { products } from "../apiV1/products/products.model";

export class ProductService {
  public async getProducts(page: number): Promise<Product[]> {
    return await products.findAll({
      limit: 10,
      offset: page
    });
  }
  public async addProduct(product: Product) {
    await products.create(product);
  }
}
