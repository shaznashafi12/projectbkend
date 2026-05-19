import express from "express";
import Order from "../models/order.js";
import Product from "../models/product.js";

const orderrouter = express.Router();


// CREATE ORDER
orderrouter.post("/create", async (req, res) => {
  try {

    const { items, paymentMethod, shippingDetails, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to order" });
    }

    // Reduce stock
    for (const item of items) {

      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.name}`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.name}`
        });
      }

      product.stock -= item.quantity;

      if (product.stock === 0) {
        product.status = "Out of Stock";
      }

      await product.save();
    }

    const newOrder = new Order({
      items,
      paymentMethod,
      shippingDetails,
      total
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// GET ALL ORDERS
orderrouter.get("/all", async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("items._id")   // ✅ correct populate path
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// UPDATE ORDER STATUS
orderrouter.put("/status/:id", async (req, res) => {
  try {

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updatedOrder);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


export default orderrouter;