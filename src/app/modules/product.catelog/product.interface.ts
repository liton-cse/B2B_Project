import { Types } from "mongoose";

export interface ICustomerTypePrice{
  categoryName: string;
  price:string;
}

export interface IProduct {
  productName: string;
  description: string;
  categoryId: Types.ObjectId;
  category: string;
  unit: string;
  basePrice: number;
  customerTypePrice: ICustomerTypePrice[];
  image: string;
  stock: number;
}
