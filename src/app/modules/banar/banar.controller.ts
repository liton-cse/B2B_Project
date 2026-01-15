import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BannerService } from './banar.service';

/**
 * Create or Update Banner
 */
const upsertBanner = catchAsync(async (req: Request, res: Response) => {
  const { ...bannerData } = req.body;
  const result = await BannerService.upsertBannerToDB(bannerData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Banner saved successfully',
    data: result,
  });
});

/**
 * Get Banner
 */
const getBanner = catchAsync(async (_req: Request, res: Response) => {
  const result = await BannerService.getBannerFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Banner retrieved successfully',
    data: result,
  });
});

export const BannerController = {
  upsertBanner,
  getBanner,
};
