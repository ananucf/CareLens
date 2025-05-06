import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { ProductHistory } from "../../../database/models/productHistory.model.js";

// Add product to productHistory 
const addProductToHistory = catchError(async (req, res, next) => {
  const { productName, suitability } = req.body;

  // Check if productName and image file are provided
  if (!productName || !req.file) {
    return next(new AppError("Product name and image are required", 400));
  }

  const productHistory = new ProductHistory({
    userId: req.user.userId, 
    productName,
    productImage: req.file.path, // Store path of uploaded image
    suitability 
  });

  await productHistory.save();

  res.status(201).json({
    success: true,
    message: "Product saved to history successfully",
    data: productHistory
  });
});

// Get all products from productHistory for this user
const getProductHistory = catchError(async (req, res, next) => {
  const productHistory = await ProductHistory.find({ userId: req.user.userId });

  res.status(200).json({
    success: true,
    data: productHistory
  });
});

// Delete product from productHistory
const deleteProduct = catchError(async (req, res, next) => {
  const { productId } = req.params;

  const deleted = await ProductHistory.findOneAndDelete({
    _id: productId,
    userId: req.user.userId || req.user._id
  });

  if (!deleted) {
    return next(new AppError("Product not found or you're not authorized to delete it", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully"
  });
});

export {
  addProductToHistory,
  deleteProduct,
  getProductHistory
};
