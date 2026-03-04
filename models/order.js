import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
productId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Product",
  required: true,
},
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    shippingDetails: {
      fullName: String,
      phone: String,
      address: String,
      landmark: String,
      city: String,
      district: String,
      state: String,
    },
    status: {
  type: String,
  default: "Pending",
}
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;