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
  return await Favourite.find({ userId }).populate('productId');
};

export const FavouriteService = {
  toggleFavouriteToDB,
  getUserFavouritesFromDB,
};
