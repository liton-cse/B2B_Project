import { BusinessUser } from './payments.model';
import { PaymentMode } from './payments.interface';

/**
 * Validate payment option before order creation
 */
const validatePayment = async (
  userId: string,
  amount: number,
  paymentMode: PaymentMode
) => {
  const user = await BusinessUser.findOne({ userId });

  if (!user) throw new Error('Payment profile not found');

  if (user.isBlocked) {
    throw new Error('Account blocked due to credit limit');
  }

  if (paymentMode === 'ONLINE') {
    if (!user.isOnlinePaymentEnabled) {
      throw new Error('Online payment disabled by admin');
    }
    return true;
  }

  if (!user.isInvoiceEnabled) {
    throw new Error('Invoice payment not allowed');
  }

  const availableCredit = user.creditLimit - user.outstandingAmount;

  if (amount > availableCredit) {
    user.isBlocked = true;
    await user.save();
    throw new Error('Credit limit exceeded');
  }

  return true;
};

/**
 * Admin dashboard stats
 */
const getAdminPaymentStats = async () => {
  const totalOutstanding = await BusinessUser.aggregate([
    { $group: { _id: null, total: { $sum: '$outstandingAmount' } } },
  ]);

  const blockedUsers = await BusinessUser.countDocuments({
    isBlocked: true,
  });

  return {
    totalOutstanding: totalOutstanding[0]?.total || 0,
    blockedUsers,
  };
};

export const PaymentService = {
  validatePayment,
  getAdminPaymentStats,
};
