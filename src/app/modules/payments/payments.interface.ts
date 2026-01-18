import { Types } from 'mongoose';

export type PaymentMode = 'ONLINE' | 'INVOICE';

export type PaymentTerm =
  | 'DUE_ON_RECEIPT'
  | 'NET_7'
  | 'NET_15'
  | 'NET_30'
  | 'NET_45'
  | 'NET_60';

export interface IBusinessUser {
  userId: Types.ObjectId;

  creditLimit: number;
  outstandingAmount: number;

  paymentTerm: PaymentTerm;

  isOnlinePaymentEnabled: boolean;
  isInvoiceEnabled: boolean;

  autoChargeEnabled: boolean;
  qbPaymentMethodId?: string;

  isBlocked: boolean;
}
