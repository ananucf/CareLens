import { Router } from 'express';
import { uploadSingleFile } from '../../fileUpload/fileUpload.js';
import { scanProductImage } from './scan.controller.js';
import { verifyToken } from "../../middleware/verifyToken.js";


const scanRouter = Router();

// رفع الصورة و تمريرها لتحليل AI
scanRouter.post('/image', verifyToken, uploadSingleFile('image', 'products'), scanProductImage);

export default scanRouter;
