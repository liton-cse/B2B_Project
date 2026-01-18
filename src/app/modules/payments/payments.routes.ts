import { Router } from 'express';
import auth from '../../middlewares/auth';
import { PaymentController } from './payments.controller';
import { USER_ROLES } from '../../../enums/user';

const router = Router();

router.post(
  '/validate',
  auth(USER_ROLES.USER),
  PaymentController.validatePayment
);
router.get(
  '/admin/stats',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  PaymentController.getAdminStats
);

export const PaymentRoutes = router;
