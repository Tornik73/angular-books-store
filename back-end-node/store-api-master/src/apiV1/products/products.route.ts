import { Router } from "express";
import verifyAdmin from "../../helpers/verifyAdmin";
import Controller from "./products.controller";

const product: Router = Router();
const controller = new Controller();

// Retrieve all Users
product.get("/:page*?", controller.getProducts);

product.put("/", verifyAdmin, controller.addProduct);

export default product;
