import { Router } from 'express';
import auth from '../../middlewares/auth';
import { InvoiceController } from './invoice.controller';
import { USER_ROLES } from '../../../enums/user';

const router = Router();

/**
 * Create invoice (invoice payment)
 */
router.post(
  '/create',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  InvoiceController.createInvoice
);

/**
 * Get invoice details for PDF
 */
router.get(
  '/:id/pdf-data',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  InvoiceController.getInvoiceForPDF
);

/**
 * Get logged-in user's invoices
 */
router.get(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  InvoiceController.getMyInvoices
);

export const InvoiceRoutes = router;
