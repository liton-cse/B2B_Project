export interface IItem {
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  customer: string; 
  items: IItem[];
  totalAmount: number;
  paymentStatus: "PENDING" | "PAID";
  qbInvoiceId?: string;
}
