import express from "express";
import Order from "../models/order.js";
import Product from "../models/product.js";

const orderrouter = express.Router();

// CREATE ORDER
orderrouter.post("/create", async (req, res) => {
  try {
    const {
      productId,
      productName,
      price,
      quantity,
      paymentMethod,
      shippingDetails,
    } = req.body;

    if (!productId)
      return res.status(400).json({ message: "Product ID is required" });

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.stock < quantity)
      return res.status(400).json({ message: "Not enough stock" });

    // Reduce stock
    product.stock -= quantity;
    if (product.stock === 0) product.status = "Out of Stock";
    await product.save();

    const order = new Order({
      productId,
      productName,
      price,
      quantity,
      total: price * quantity,
      paymentMethod,
      shippingDetails,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL ORDERS  🔥 (THIS WAS MISSING)
orderrouter.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
orderrouter.put("/status/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default orderrouter;