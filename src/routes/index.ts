import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { ProductAndcatelogRoutes } from '../app/modules/product.catelog/product.route';
import { BannerRoutes } from '../app/modules/banar/banar.route';
import { revieweRouter } from '../app/modules/review/review.routes';
import { FavouriteRoutes } from '../app/modules/favourite/favourite.routes';
import { InvoiceRoutes } from '../app/modules/Invoice/invoice.routes';
import { PaymentRoutes } from '../app/modules/payments/payments.routes';
import { CustomerTypeRoutes } from '../app/modules/customer.type/customerr.type.routes';
import { CategoryRoutes } from '../app/modules/category.management/category.routes';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/customer-type',
    route: CustomerTypeRoutes,
  },
  {
    path: '/product&catelog',
    route: ProductAndcatelogRoutes,
  },
  {
    path: '/review',
    route: revieweRouter,
  },
  {
    path: '/banner',
    route: BannerRoutes,
  },
  {
    path: '/favourite',
    route: FavouriteRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/invoice',
    route: InvoiceRoutes,
  },
  {
    path: '/online-payment',
    route: PaymentRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
