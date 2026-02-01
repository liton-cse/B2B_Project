import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "./order,interface";


interface OrderDoc extends IOrder, Document {}

const OrderSchema: Schema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  items: [{ name: String, price: Number, quantity: Number }],
  totalAmount: Number,
  paymentStatus: { type: String, enum: ["PENDING", "PAID"], default: "PENDING" },
  qbInvoiceId: String,
}, { timestamps: true });

export const orderModel = mongoose.model<OrderDoc>("Order", OrderSchema);
