import { HeartDisease } from '../../../database/models/StatisticsModels/heartStatistics.model.js';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utils/appError.js';

// Create New Heart Disease Entry
const createStatHeart = catchError(async (req, res, next) => {
  const { userId, exerciseHours, heartRate, weight, height } = req.body;

  if (!userId || !exerciseHours || !heartRate || !weight || !height) {
    return next(new AppError('Missing required fields', 400));
  }
  
  const newEntry = new HeartDisease({
    userId,
    exerciseHours,
    heartRate,
    weight,
    height,
  });

  await newEntry.save();

  res.status(201).json({
    status: 'success',
    message: 'Heart disease entry saved successfully',
    data: newEntry,
  });
});

// Get All Heart Disease Records for a Patient
const getAllStatHeart = catchError(async (req, res, next) => {
  const { userId } = req.params;

  const entries = await HeartDisease.find({ userId }).sort({ createdAt: -1 });

  if (!entries || entries.length === 0) {
    return next(new AppError('No heart disease entries found for this user', 404));
  }

  res.status(200).json({
    status: 'success',
    results: entries.length,
    data: entries,
  });
});

// Get Specific Heart Disease Record by ID
const getStatHeart = catchError(async (req, res, next) => {
  const { id } = req.params;

  const entry = await HeartDisease.findById(id);

  if (!entry) {
    return next(new AppError('No heart disease entry found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: entry,
  });
});

// Update Specific Heart Disease Record by ID
const updateStatHeart = catchError(async (req, res, next) => {
  const { id } = req.params;

  const entry = await HeartDisease.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!entry) {
    return next(new AppError('No heart disease entry found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: entry,
  });
});

export {
  createStatHeart,
  getAllStatHeart,
  getStatHeart,
  updateStatHeart
};
