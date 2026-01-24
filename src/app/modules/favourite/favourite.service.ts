import { Types } from 'mongoose';
import { Favourite } from './favourite.model';

/**
 * Toggle favourite (add/remove)
 */
const toggleFavouriteToDB = async (userId: string, productId: string) => {
  const exists = await Favourite.findOne({ userId, productId });

  if (exists) {
    await Favourite.deleteOne({ userId, productId });
    return { isFavourite: false };
  }

  await Favourite.create({ userId, productId });
  return { isFavourite: true };
};

/**
 * Get user's favourites
 */

const getUserFavouritesFromDB = async (userId: string) => {
  const favourites = await Favourite.aggregate([
    // 1️⃣ Only this user's favourites
    {
      $match: {
        userId: new Types.ObjectId(userId),
      },
    },

    // 2️⃣ Join Product
    {
      $lookup: {
        from: 'productandcatelogs',
        localField: 'productId',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },

    // 3️⃣ Join Reviews for rating
    {
      $lookup: {
        from: 'reviews',
        localField: 'product._id',
        foreignField: 'productId',
        as: 'reviews',
      },
    },

    // 4️⃣ Calculate rating & stock status
    {
      $addFields: {
        avgRating: { $avg: '$reviews.rating' },
        reviewCount: { $size: '$reviews' },
        'product.stockStatus': {
          $cond: [
            { $gt: ['$product.stock', 0] },
            'available',
            'out_of_stock',
          ],
        },
      },
    },

    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$product',
            {
              avgRating: { $ifNull: ['$avgRating', 0] },
              reviewCount: '$reviewCount',
            },
          ],
        },
      },
    },
  ]);

  return favourites;
};




export const FavouriteService = {
  toggleFavouriteToDB,
  getUserFavouritesFromDB,
};
