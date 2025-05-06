import { Diabetes } from '../../../database/models/StatisticsModels/diabetesStatistics.model.js';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utils/appError.js';

// ✅ Create New Diabetes Entry
const createStatDiabetes = catchError(async (req, res, next) => {
  const { userId, exerciseHours, bloodSugarLevel, weight, height } = req.body;

  if (!userId || !exerciseHours || !bloodSugarLevel || !weight || !height) {
    return next(new AppError('Missing required fields', 400));
  }

  const newEntry = new Diabetes({
    userId,
    exerciseHours,
    bloodSugarLevel,
    weight,
    height
  });

  await newEntry.save();

  res.status(201).json({
    status: 'success',
    message: 'Diabetes entry saved successfully',
    data: newEntry,
  });
});

// ✅ Get All Diabetes Entries for a User
const getAllStatDiabetes = catchError(async (req, res, next) => {
  const { userId } = req.params;

  const entries = await Diabetes.find({ userId }).sort({ submittedAt: -1 });

  if (!entries || entries.length === 0) {
    return next(new AppError('No diabetes entries found for this user', 404));
  }

  res.status(200).json({
    status: 'success',
    results: entries.length,
    data: entries,
  });
});

// ✅ Get Specific Diabetes Entry
const getStatDiabetes = catchError(async (req, res, next) => {
  const { id } = req.params;

  const entry = await Diabetes.findById(id);

  if (!entry) {
    return next(new AppError('No diabetes entry found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: entry,
  });
});

// ✅ Update Specific Diabetes Entry
const updateStatDiabetes = catchError(async (req, res, next) => {
  const { id } = req.params;

  const entry = await Diabetes.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!entry) {
    return next(new AppError('No diabetes entry found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: entry,
  });
});

export {
  createStatDiabetes,
  getAllStatDiabetes,
  getStatDiabetes,
  updateStatDiabetes
};
