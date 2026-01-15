import { Types } from 'mongoose';
import { IProduct } from './product.interface';
import { Product } from './product.model';
import { ReviewModel } from '../review/review.model';
import { NotificationService } from '../notification/notification.service';

/**
 * Create new product
 */
const createProductToDB = async (payload: IProduct) => {
  const result = await Product.create(payload);
  NotificationService.sendCustomNotification(
    result.productName,
    result.description,
    result._id
  );
  return result;
};

/**
 * Get all products with search, filter & pagination
 */
const getAllProductsFromDB = async (query: any) => {
  const { search, category, minPrice, maxPrice, page = 1, limit = 10 } = query;

  const filter: any = {};

  // 🔍 Search by product name
  if (search) {
    filter.productName = { $regex: search, $options: 'i' };
  }

  // 🏷️ Filter by category
  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }

  // 💰 Filter by price
  if (minPrice || maxPrice) {
    filter.sellingPrice = {};
    if (minPrice) filter.sellingPrice.$gte = Number(minPrice);
    if (maxPrice) filter.sellingPrice.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const products = await Product.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  // ⭐ Add rating using Promise.all
  const data = await Promise.all(
    products.map(async product => {
      const stats = await ReviewModel.aggregate([
        {
          $match: {
            productId: new Types.ObjectId(product._id),
          },
        },
        {
          $group: {
            _id: '$productId',
            averageRating: { $avg: '$rating' },
            totalReviews: { $sum: 1 },
          },
        },
      ]);

      const averageRating = stats.length ? stats[0].averageRating : 0;
      const totalReviews = stats.length ? stats[0].totalReviews : 0;

      let status = 'Available';
      if (product.stock === 0) status = 'Out of Stock';
      else if (product.stock <= 10) status = 'Limited Stock';

      return {
        ...product.toObject(),
        status,
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews,
      };
    })
  );

  const total = await Product.countDocuments(filter);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data,
  };
};

/**
 * Get product by ID
 */
const getProductByIdFromDB = async (id: string) => {
  // 1️⃣ Get product
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  // 2️⃣ Get rating stats
  const ratingStats = await ReviewModel.aggregate([
    {
      $match: {
        productId: new Types.ObjectId(id),
      },
    },
    {
      $group: {
        _id: '$productId',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const rating = {
    averageRating: ratingStats.length
      ? Number(ratingStats[0].averageRating.toFixed(1))
      : 0,
    totalReviews: ratingStats.length ? ratingStats[0].totalReviews : 0,
  };

  // 3️⃣ Get all reviews
  const reviews = await ReviewModel.find({
    productId: new Types.ObjectId(id),
  })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });

  return {
    product,
    rating,
    reviews,
  };
};

/**
 * Update product
 */
const updateProductToDB = async (id: string, payload: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

/**
 * Delete product
 */
const deleteProductFromDB = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const ProductService = {
  createProductToDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductToDB,
  deleteProductFromDB,
};
