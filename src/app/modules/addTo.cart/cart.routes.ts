import { Router } from 'express';
import { CartController } from './cart.controller';
import auth from '../../middlewares/auth'; // your auth middleware
import { USER_ROLES } from '../../../enums/user';

const router = Router();

/**
 * Cart Routes (Protected)
 */

router.get('/', auth(USER_ROLES.USER), CartController.getMyCart);

router.post('/add', auth(USER_ROLES.USER), CartController.addToCart);

router.patch('/update', auth(USER_ROLES.USER), CartController.updateCartItemQuantity);

router.delete('/item', auth(USER_ROLES.USER), CartController.removeCartItem);

router.delete('/clear', auth(USER_ROLES.USER), CartController.clearCart);

export const CartRoutes = router;
