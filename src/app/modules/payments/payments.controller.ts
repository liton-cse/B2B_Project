import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payments.service';

const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const { amount, paymentMode } = req.body;

  await PaymentService.validatePayment(req.user.id, amount, paymentMode);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Payment option validated',
  });
});

const getAdminStats = catchAsync(async (_req: Request, res: Response) => {
  const result = await PaymentService.getAdminPaymentStats();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Payment stats fetched',
    data: result,
  });
});

export const PaymentController = {
  validatePayment,
  getAdminStats,
};
