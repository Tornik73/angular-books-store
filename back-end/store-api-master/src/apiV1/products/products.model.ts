import sequelize from "../../config/db.connection";
import * as Sequelize from "sequelize";

export const products: any = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

export interface Product {
  id: number;
  name: string;
  price: number;
}
