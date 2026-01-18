import { Types } from 'mongoose';

export interface IInvoice {
  businessUserId: Types.ObjectId;
  orderId: Types.ObjectId;

  invoiceNumber: string;
  amount: number;

  issueDate: Date;
  dueDate: Date;

  status: 'UNPAID' | 'PAID' | 'OVERDUE';
  paymentTerm: string;
}
