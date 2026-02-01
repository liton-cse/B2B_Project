import mongoose, { Schema, Document } from "mongoose";
import { ICustomer } from "./customer.interface";


interface CustomerDoc extends ICustomer, Document {}

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  qbCustomerId: { type: String, required: true },
  creditLimit: { type: Number, default: 0 },
});

export const customerModel = mongoose.model<CustomerDoc>("Customer", CustomerSchema);
