import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

/**
 * Product Schema
 */
const productSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    unit: {
      type: String,
      required: true,
    },
    mainPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>('Product&Catelog', productSchema);
