import { Invoice } from './invoice.model';
import { BusinessUser } from '../payments/payments.model';
import { calculateDueDate } from './invoice.utils';

/**
 * Create invoice after order placement
 */
const createInvoice = async (
  userId: string,
  orderId: string,
  amount: number
) => {
  const businessUser = await BusinessUser.findOne({ userId });

  if (!businessUser) {
    throw new Error('Business user not found');
  }

  const issueDate = new Date();
  const dueDate = calculateDueDate(issueDate, businessUser.paymentTerm);

  const invoice = await Invoice.create({
    businessUserId: businessUser._id,
    orderId,
    amount,
    issueDate,
    dueDate,
    paymentTerm: businessUser.paymentTerm,
    invoiceNumber: `INV-${Date.now()}`,
  });

  businessUser.outstandingAmount += amount;
  await businessUser.save();

  return invoice;
};

/**
 * Get invoice details for PDF generation
 */
const getInvoiceForPDF = async (invoiceId: string) => {
  const invoice = await Invoice.findById(invoiceId)
    .populate('businessUserId')
    .populate('orderId');

  if (!invoice) {
    throw new Error('Invoice not found');
  }

  return invoice;
};

/**
 * Get invoices of logged-in user
 */
const getMyInvoices = async (userId: string) => {
  return Invoice.find({}).populate('orderId');
};

export const InvoiceService = {
  createInvoice,
  getInvoiceForPDF,
  getMyInvoices,
};
