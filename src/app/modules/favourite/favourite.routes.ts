import { Router } from 'express';
import { FavouriteController } from './favourite.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = Router();

router.post('/', auth(USER_ROLES.USER), FavouriteController.toggleFavourite);
router.get('/', auth(USER_ROLES.USER), FavouriteController.getMyFavourites);

export const FavouriteRoutes = router;
