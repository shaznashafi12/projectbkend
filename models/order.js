import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
 items: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        image: { type: String },
        category: { type: String, required: true } // changed to string
      }
    ], 
    //  productName: {
    //   type: String,
    //   required: true,
    // },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
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