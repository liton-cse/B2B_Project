import { Router } from 'express';
import { BannerController } from './banar.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = Router();

/**
 * Banner routes
 * PUT → create/update (single banner)
 * GET → fetch banner
 */

router.put('/', auth(USER_ROLES.ADMIN), BannerController.upsertBanner);
router.get('/', auth(USER_ROLES.ADMIN), BannerController.getBanner);

export const BannerRoutes = router;
