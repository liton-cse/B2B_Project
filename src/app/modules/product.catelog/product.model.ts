import { Schema, model, Document } from 'mongoose';
import { IProduct, ICustomerTypePrice } from './product.interface';


/**
 * Sub-schema for customer type price
 */
const customerTypePriceSchema = new Schema<ICustomerTypePrice>(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    _id: false, // prevents auto _id for sub-documents
  }
);

/**
 * Product schema
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
      trim: true,
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
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    customerTypePrice: {
      type: [customerTypePriceSchema],
      default: [],
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model<IProduct>(
  'ProductAndCatelog',
  productSchema
);
