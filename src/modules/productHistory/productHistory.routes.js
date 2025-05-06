import { Router } from 'express';
import { verifyToken } from '../../middleware/verifyToken.js';
import { addProductToHistory, deleteProduct, getProductHistory } from './productHistory.controller.js';
import { uploadSingleFile } from '../../fileUpload/fileUpload.js';

const productHistoryRouter = Router();

productHistoryRouter.get('/', verifyToken, getProductHistory);
productHistoryRouter.post('/', verifyToken, uploadSingleFile('productImage', 'productHistory'), addProductToHistory);
productHistoryRouter.delete('/:productId', verifyToken, deleteProduct);

export default productHistoryRouter;
