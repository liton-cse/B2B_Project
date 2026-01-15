import { Types } from 'mongoose';
import { IReview } from './review.interface';
import { ReviewModel } from './review.model';

class ReviewService {
  async createReview(payload: IReview) {
    return await ReviewModel.create(payload);
  }

  async getReviewsByProduct(productId: string) {
    return await ReviewModel.find({
      productId: new Types.ObjectId(productId),
    })
      .populate('userId', 'name email image ')
      .sort({ createdAt: -1 });
  }
}

export const reviewService = new ReviewService();
