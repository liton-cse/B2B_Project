import { Schema, model } from 'mongoose';
import { IBanner } from './banar.interface';

/**
 * Banner Schema
 * Only ONE document should exist
 */

const bannerSchema = new Schema<IBanner>(
  {
    bannerName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BannerModel = model<IBanner>('Banner', bannerSchema);
