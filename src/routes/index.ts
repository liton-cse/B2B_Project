import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { ProductAndcatelogRoutes } from '../app/modules/product.catelog/product.route';
import { BannerRoutes } from '../app/modules/banar/banar.route';
import { revieweRouter } from '../app/modules/review/review.routes';
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
    path: '/product&catelog',
    route: ProductAndcatelogRoutes,
  },
  {
    path: '/review',
    route: revieweRouter,
  },
  {
    path: '/banar',
    route: BannerRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
