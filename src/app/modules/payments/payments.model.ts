import { Schema, model } from 'mongoose';
import { IBusinessUser } from './payments.interface';

const businessUserSchema = new Schema<IBusinessUser>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    creditLimit: { type: Number, default: 0 },
    outstandingAmount: { type: Number, default: 0 },

    paymentTerm: {
      type: String,
      enum: ['DUE_ON_RECEIPT', 'NET_7', 'NET_15', 'NET_30', 'NET_45', 'NET_60'],
      default: 'DUE_ON_RECEIPT',
    },

    isOnlinePaymentEnabled: { type: Boolean, default: true },
    isInvoiceEnabled: { type: Boolean, default: false },

    autoChargeEnabled: { type: Boolean, default: false },
    qbPaymentMethodId: String,

    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BusinessUser = model<IBusinessUser>(
  'BusinessUser',
  businessUserSchema
);
