
export interface ICustomerTypePrice{
  categoryName: string;
  price:string;
}

export interface IProduct {
  productName: string;
  description: string;
  category: string;
  unit: string;
  basePrice: number;
  customerTypePrice: ICustomerTypePrice[];
  image: string;
  stock: number;
}
