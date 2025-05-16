import mongoose from 'mongoose';
import { Anemia } from "../../../database/models/StatisticsModels/anemiaStatistics.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

// Create New Anemia Entry
const createStatAnemia = catchError(async (req, res, next) => {
  const {
    userId,
    exerciseHours,
    tookMedication,
    weight,
    height
  } = req.body;

  const record = new Anemia({
    userId,
    exerciseHours,
    tookMedication,
    weight,
    height
  });

  await record.save();

  res.status(201).json({ message: "Anemia record created.", data: record });
});

// Get All Anemia Records for a Patient
const getAllStatAnemia = catchError(async (req, res, next) => {
  const { userId } = req.params;

  // Validate userId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID format.", 400));
  }

  const records = await Anemia.find({
    userId: new mongoose.Types.ObjectId(userId)
  }).sort({ createdAt: -1 });

  if (!records.length) {
    return next(new AppError("No anemia records found.", 404));
  }

  res.status(200).json({ message: "Success", data: records });
});

const getStatAnemia = catchError(async (req, res, next) => {
  const { recordId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recordId)) {
    return next(new AppError("Invalid record ID format.", 400));
  }

  const record = await Anemia.findById(recordId);

  if (!record) {
    return next(new AppError("No anemia record found with this ID.", 404));
  }

  res.status(200).json({ message: "Success", data: record });
});

// Update Specific Anemia Record by ID
const updateStatAnemia = catchError(async (req, res, next) => {
  const { recordId } = req.params;
  const {
    exerciseHours,
    tookMedication,
    weight,
    height
  } = req.body;

  const updated = await Anemia.findByIdAndUpdate(
    recordId,
    {
      exerciseHours,
      tookMedication,
      weight,
      height,
      updatedAt: new Date()
    },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return next(new AppError("No anemia record found to update.", 404));
  }

  res.status(200).json({ message: "Anemia record updated.", data: updated });
});

export {
  createStatAnemia,
  getAllStatAnemia,
  getStatAnemia,
  updateStatAnemia
};
