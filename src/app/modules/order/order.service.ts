import { IOrder } from "./order,interface";
import { orderModel } from "./order.model";


export const createOrderService = async (data: IOrder) => {
  const totalAmount = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return orderModel.create({ ...data, totalAmount });
};

export const markPaidService = async (orderId: string, invoiceId: string) => {
  return orderModel.findByIdAndUpdate(orderId, { paymentStatus: "PAID", qbInvoiceId: invoiceId }, { new: true });
};
