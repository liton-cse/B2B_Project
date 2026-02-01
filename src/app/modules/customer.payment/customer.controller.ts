import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { getTokenFromCode } from '../../../shared/quickbook.auth.service';
import { customerModel } from './customer.model';
import { updateCreditLimitQB } from './customer.service';


/**
 * QuickBooks OAuth Callback
 */
const qbCallback = catchAsync(async (req: Request, res: Response) => {
  const { code, realmId } = req.query as { code: string; realmId: string };

  if (!code || !realmId) {
    throw new Error('Missing QuickBooks OAuth parameters');
  }

  const token = await getTokenFromCode(code);

  (req.session as any).qbAccessToken = token.access_token;
  (req.session as any).qbRefreshToken = token.refresh_token;
  (req.session as any).realmId = realmId;

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'QuickBooks connected successfully!',
    data: null,
  });
});

/**
 * Set Customer Credit Limit
 */
const setCreditLimit = catchAsync(async (req: Request, res: Response) => {
  const { customerId, limit } = req.body;

  const customer = await customerModel.findById(customerId);

  if (!customer) {
    throw new Error('Customer not found');
  }

  await updateCreditLimitQB(
    (req.session as any).realmId,
    (req.session as any).qbAccessToken,
    customer.qbCustomerId,
    limit
  );

  customer.creditLimit = limit;
  await customer.save();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Credit limit updated successfully',
    data: { customerId, limit },
  });
});

export const CustomerController = {
  qbCallback,
  setCreditLimit,
};
