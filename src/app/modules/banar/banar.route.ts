import { Router } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import {
  getBannerController,
  createAndUpdateBannerController,
} from './banar.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = Router();

// Get banner (ADMIN + USER)
router.get(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  getBannerController
);

// Create / Update banner (ADMIN only)
router.post(
  '/create-update',
  auth(USER_ROLES.ADMIN),
  fileUploadHandler(),
  createAndUpdateBannerController
);

export const BannerRoutes = router;
