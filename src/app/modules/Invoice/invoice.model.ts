import { Schema, model } from 'mongoose';
import { IInvoice } from './invoice.interface';

const invoiceSchema = new Schema<IInvoice>(
  {
    businessUserId: {
      type: Schema.Types.ObjectId,
      ref: 'BusinessUser',
      required: true,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },

    invoiceNumber: { type: String, unique: true },
    amount: { type: Number, required: true },

    issueDate: Date,
    dueDate: Date,

    paymentTerm: String,

    status: {
      type: String,
      enum: ['UNPAID', 'PAID', 'OVERDUE'],
      default: 'UNPAID',
    },
  },
  { timestamps: true }
);

export const Invoice = model<IInvoice>('Invoice', invoiceSchema);
