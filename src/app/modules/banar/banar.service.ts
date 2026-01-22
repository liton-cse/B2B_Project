import { IBanner } from "./banar.interface";
import { BannerModel } from "./banar.model";


/**
 * Create banner if not exists, or update web/mobile banners
 */
export const createAndUpdateBannerService = async (payload: IBanner) => {
  const banner = await BannerModel.findOne();

  if (banner) {
    banner.webBanners = payload.webBanners || banner.webBanners;
    banner.mobileBanners = payload.mobileBanners || banner.mobileBanners;
    return await banner.save();
  }
  return await BannerModel.create(payload);
};


/**
 * Get banner configuration
 * Returns the single banner document
 */
export const getBannerService = async () => {
  return await BannerModel.findOne().lean();
};
