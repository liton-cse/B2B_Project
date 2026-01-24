import { Types } from 'mongoose';

/**
 * Single product inside cart
 */
export interface ICartItem {
  productId: Types.ObjectId; 
  quantity: number;
}