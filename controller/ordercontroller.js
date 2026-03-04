import Order from "../models/order.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      productId,
      productName,
      price,
      quantity,
      total,
      paymentMethod,
      shippingDetails,
    } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const newOrder = new Order({
      productId,
      productName,
      price,
      quantity,
      total: price * quantity, // optional if total is passed
      paymentMethod,
      shippingDetails,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order saved successfully",
      data: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving order",
      error: error.message,
    });
  }
};// GET ALL ORDERS (Optional for Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};
export const updateOrderStatus = async (req, res) => {

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

};