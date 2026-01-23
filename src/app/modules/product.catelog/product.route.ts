import { Router } from 'express';
import { ProductController } from './product.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = Router();

router.post('/', fileUploadHandler(), ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getSingleProduct);
router.patch('/:id',fileUploadHandler(), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/categories/all', ProductController.getAllProductsCategory);
export const ProductAndcatelogRoutes = router;
