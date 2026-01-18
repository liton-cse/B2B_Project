import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const result = await UserService.createUserToDB(userData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User created successfully',
      data: result,
    });
  }
);

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserProfileFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

//update profile
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    const result = await UserService.updateProfileToDB(user, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);
// update the user status and customer type.

const updateUserStatusAndCustomerType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const { status, customerType } = req.body;
    const result = await UserService.updateUserProfileStatusToDB(
      userId,
      status,
      customerType
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User updated successfully',
      data: result,
    });
  }
);

//get all user.

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsersFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

export const UserController = {
  createUser,
  getUserProfile,
  getAllUsers,
  updateProfile,
  updateUserStatusAndCustomerType,
};
