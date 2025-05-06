import { Heart } from "../../../database/models/DiagnosisModels/heartDiagnosis.model.js";
import { catchError } from "../../middleware/catchError.js";
import { predictHeart } from "../../services/aiDiagnosis.service.js";
import { AppError } from "../../utils/appError.js";

// Create Heart Record
const createHeart = catchError(async (req, res, next) => {
  const { patientId, measurements } = req.body;

  const existing = await Heart.findOne({ patientId });
  if (existing) {
    return next(new AppError("Heart record already exists for this patient.", 400));
  }
 
  // استخدم AI prediction لتحديد إذا كانت القياسات تشير إلى مرض
  const diagnosisResult = await predictHeart(measurements);

  const record = new Heart({ patientId, measurements, diagnosisResult });
  await record.save();

  res.status(201).json({ message: "Heart record created.", data: record });
});

// Get Heart Record
const getHeart = catchError(async (req, res, next) => {
  const { patientId } = req.params;

  const record = await Heart.findOne({ patientId });
  if (!record) {
    return next(new AppError("No heart record found.", 404));
  }

  res.status(200).json({ message: "Success", data: record });
});

// Update Heart Record
const updateHeart = catchError(async (req, res, next) => {
  const { patientId } = req.params;
  const { measurements } = req.body;

  // استخدم AI prediction لتحديد إذا كانت القياسات تشير إلى مرض
  const diagnosisResult = await predictHeart(measurements);

  const updated = await Heart.findOneAndUpdate(
    { patientId },
    { measurements, diagnosisResult, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return next(new AppError("No heart record to update.", 404));
  }

  res.status(200).json({ message: "Heart record updated.", data: updated });
});

export {
  createHeart,
  getHeart,
  updateHeart
};
