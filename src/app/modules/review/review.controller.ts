import { Request, Response } from 'express';
import { reviewService } from './review.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

class ReviewController {
  async createReview(req: Request, res: Response) {
    const payload = {
      ...req.body,
      userId: req.user.id,
    };
    const review = await reviewService.createReview(payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'review created successfully',
      data: review,
    });
  }

  async getProductReviews(req: Request, res: Response) {
    const { productId } = req.params;
    const reviews = await reviewService.getReviewsByProduct(productId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'review created successfully',
      data: reviews,
    });
  }
}

export const reviewController = new ReviewController();
