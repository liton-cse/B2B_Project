import { Schema, model, Document } from "mongoose";

import { IBanner, webBanner as WebBanner, mobileBanner as MobileBanner } from "./banar.interface";

/**
 * Web banner schema
 * _id disabled because banners don't need individual IDs
 */
const WebBannerSchema = new Schema<WebBanner>(
  {
    image: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

/**
 * Mobile banner schema
 */
const MobileBannerSchema = new Schema<MobileBanner>(
  {
    image: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

/**
 * Main banner schema
 */
const BannerSchema = new Schema<IBanner>(
  {
    webBanners: {
      type: [WebBannerSchema],
      default: []
    },
    mobileBanners: {
      type: [MobileBannerSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const BannerModel = model<IBanner>("Banner", BannerSchema);
