import { ProductModel } from './product.model';
import { IProduct } from './product.interface';

const createProductToDB = async (payload: IProduct) => {
  return await ProductModel.create(payload);
};



const getAllProductsFromDB = async (query: any) => {
  const {
    search,
    category,
    page = 1,
    limit = 10,
  } = query;

  const filter: any = {};

  // 🔍 Search by product name
  if (search) {
    filter.productName = { $regex: search, $options: 'i' };
  }

  // 🏷️ Filter by category
  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }

  // 📄 Pagination
  const skip = (Number(page) - 1) * Number(limit);

  const products = await ProductModel.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  // 🟢 Add availability status
  const data = products.map(product => {
    let status = 'Available';

    if (product.stock === 0) {
      status = 'Out of Stock';
    } else if (product.stock <= 10) {
      status = 'Limited Stock';
    }

    return {
      ...product.toObject(),
      status,
    };
  });

  const total = await ProductModel.countDocuments(filter);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data,
  };
};




const getSingleProductFromDB = async (id: string) => {
  return await ProductModel.findById(id);
};

const updateProductToDB = async (
  id: string,
  payload: Partial<IProduct>
) => {
  return await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteProductFromDB = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};

export const ProductService = {
  createProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductToDB,
  deleteProductFromDB,
};
