import mongoose from 'mongoose';
import { Pressure } from '../../../database/models/StatisticsModels/bloodPressureStatistics.model.js';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utils/appError.js';

// Create New Blood Pressure Entry
const createStatPressure = catchError(async (req, res, next) => {
  const {
    userId,
    exerciseHours,
    bloodPressureLevel,
    weight,
    height,
  } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid or missing user ID", 400));
  }

  const [systolic, diastolic] = bloodPressureLevel.split('/').map(Number);

  if (!systolic || !diastolic) {
    return next(new AppError('Invalid blood pressure format. Use format like "120/80"', 400));
  }

  const newEntry = new Pressure({
    userId,
    exerciseHours,
    bloodPressureLevel,
    systolic,
    diastolic,
    weight,
    height,
  });

  await newEntry.save();

  res.status(201).json({
    status: 'success',
    message: 'Pressure entry saved successfully',
    data: newEntry,
  });
});

// Get All Entries for a User
const getAllStatPressure = catchError(async (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID format.", 400));
  }

  const entries = await Pressure.find({ userId }).sort({ submittedAt: -1 });

  if (!entries.length) {
    return next(new AppError('No pressure entries found for this user', 404));
  }

  res.status(200).json({
    status: 'success',
    results: entries.length,
    data: entries,
  });
});

// Get One Entry by ID
const getStatPressure = catchError(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid record ID format.", 400));
  }

  const entry = await Pressure.findById(id);

  if (!entry) {
    return next(new AppError('No pressure entry found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: entry,
  });
});

// Update Entry by ID
const updateStatPressure = catchError(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid record ID format.", 400));
  }

  if (req.body.bloodPressureLevel) {
    const [systolic, diastolic] = req.body.bloodPressureLevel.split('/').map(Number);

    if (!systolic || !diastolic) {
      return next(new AppError('Invalid blood pressure format. Use format like "120/80"', 400));
    }

    req.body.systolic = systolic;
    req.body.diastolic = diastolic;
  }

  const entry = await Pressure.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!entry) {
    return next(new AppError('No pressure entry found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: entry,
  });
});


export {
  createStatPressure,
  getAllStatPressure,
  getStatPressure,
  updateStatPressure
};
