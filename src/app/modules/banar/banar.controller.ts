import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { createAndUpdateBannerService, getBannerService } from './banar.service';
import { getMultipleFilesPath } from '../../../shared/getFilePath';

/**
 * Create banner once, then update web/mobile banners
 * Accepts multiple images for both web and mobile
 */
export const createAndUpdateBannerController = catchAsync(
  async (req: Request, res: Response) => {
    const webBannersFiles = getMultipleFilesPath(req.files, 'webBanner') || [];
    const mobileBannersFiles = getMultipleFilesPath(req.files, 'mobileBanner') || [];

    // Transform into interface format
    const webBanners = webBannersFiles.map((filePath) => ({ image: filePath }));
    const mobileBanners = mobileBannersFiles.map((filePath) => ({ image: filePath }));
    const result = await createAndUpdateBannerService({
      webBanners,
      mobileBanners,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Banner created or updated successfully',
      data: result,
    });
  }
);


/**
 * Get banner configuration
 */
export const getBannerController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getBannerService();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Banner fetched successfully',
      data: result,
    });
  }
);
