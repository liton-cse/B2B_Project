import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { InvoiceService } from './invoice.service';

/**
 * Create invoice (called after order creation)
 */
const createInvoice = catchAsync(async (req: Request, res: Response) => {
  const { orderId, amount } = req.body;

  const result = await InvoiceService.createInvoice(
    req.user.id,
    orderId,
    amount
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Invoice created successfully',
    data: result,
  });
});

/**
 * Get invoice data for PDF
 */
const getInvoiceForPDF = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await InvoiceService.getInvoiceForPDF(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Invoice data fetched',
    data: result,
  });
});

/**
 * Get logged-in user's invoices
 */
const getMyInvoices = catchAsync(async (req: Request, res: Response) => {
  const result = await InvoiceService.getMyInvoices(req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Invoices fetched successfully',
    data: result,
  });
});

export const InvoiceController = {
  createInvoice,
  getInvoiceForPDF,
  getMyInvoices,
};
