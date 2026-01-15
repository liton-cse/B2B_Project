import { IBanner } from './banar.interface';
import { BannerModel } from './banar.model';

/**
 * Create or Update Banner (Upsert)
 * If banner exists → update
 * If not → create
 */
const upsertBannerToDB = async (payload: IBanner) => {
  const banner = await BannerModel.findOne();

  if (banner) {
    return await BannerModel.findByIdAndUpdate(banner._id, payload, {
      new: true,
    });
  }

  return await BannerModel.create(payload);
};

/**
 * Get Banner
 */
const getBannerFromDB = async () => {
  return await BannerModel.findOne();
};

export const BannerService = {
  upsertBannerToDB,
  getBannerFromDB,
};
