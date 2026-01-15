import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './product.service';
import { getSingleFilePath } from '../../../shared/getFilePath';

/**
 * Create product
 */
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const image = getSingleFilePath(req.files, 'image');
  const payload = {
    ...req.body,
    image,
  };
  const result = await ProductService.createProductToDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Product created successfully',
    data: result,
  });
});

/**
 * Get all products (search, filter, pagination)
 */
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProductsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Products retrieved successfully',
    data: result,
  });
});

/**
 * Get product by ID
 */
const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.getProductByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product retrieved successfully',
    data: result,
  });
});

/**
 * Update product
 */
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const image = getSingleFilePath(req.files, 'image');
  const payload = {
    ...req.body,
    image,
  };
  const result = await ProductService.updateProductToDB(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

/**
 * Delete product
 */
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.deleteProductFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
