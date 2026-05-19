import express from "express";
import upload from "../config/multer.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProducts,
  updateProduct
} from "../controller/productController.js";

const productrouter = express.Router();

productrouter.post("/", upload.single("image"), createProduct);

productrouter.get("/", getProducts);
productrouter.get("/:id", getProductById);
productrouter.put("/:id", updateProduct);
productrouter.delete("/:id", deleteProduct);
productrouter.get("/all", getAllProducts); // new endpoint for admin dashboard

export default productrouter;