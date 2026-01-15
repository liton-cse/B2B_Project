import { Router } from 'express';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = Router();

/**
 * Product routes
 */
router.post(
  '/',
  auth(USER_ROLES.ADMIN),
  fileUploadHandler(),
  ProductController.createProduct
);
router.get(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  ProductController.getAllProducts
);
router.get(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  ProductController.getProductById
);
router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN),
  fileUploadHandler(),
  ProductController.updateProduct
);
router.delete('/:id', auth(USER_ROLES.ADMIN), ProductController.deleteProduct);

export const ProductAndcatelogRoutes = router;
