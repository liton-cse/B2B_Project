import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { createOrderService, markPaidService } from './order.service';
import { orderModel } from './order.model';
import { createInvoiceQB } from '../customer.payment/customer.service';


/**
 * Create Order
 */
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await createOrderService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Order created successfully',
    data: order,
  });
});

/**
 * Complete Payment & Create QuickBooks Invoice
 */
const completePayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.body;

  const order = await orderModel.findById(orderId).populate('customer');

  if (!order) {
    throw new Error('Order not found');
  }

  const customer: any = order.customer;

  const invoiceId = await createInvoiceQB(
    (req.session as any).realmId,
    (req.session as any).qbAccessToken,
    order,
    customer.qbCustomerId
  );

  const updatedOrder = await markPaidService(orderId, invoiceId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Payment completed & invoice created',
    data: updatedOrder,
  });
});

export const OrderController = {
  createOrder,
  completePayment,
};
