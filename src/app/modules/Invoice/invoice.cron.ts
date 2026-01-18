import cron from 'node-cron';
import { Invoice } from './invoice.model';
import { BusinessUser } from '../payments/payments.model';

cron.schedule('0 2 * * *', async () => {
  const invoices = await Invoice.find({
    status: 'UNPAID',
    dueDate: { $lt: new Date() },
  });

  for (const invoice of invoices) {
    const user = await BusinessUser.findById(invoice.businessUserId);

    if (!user || !user.autoChargeEnabled) {
      invoice.status = 'OVERDUE';
      await invoice.save();
      continue;
    }

    // External QuickBooks charge here
    const charged = true;

    if (charged) {
      invoice.status = 'PAID';
      await invoice.save();

      user.outstandingAmount -= invoice.amount;
      await user.save();
    }
  }
});
