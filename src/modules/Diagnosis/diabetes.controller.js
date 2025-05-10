import { Diabetes } from "../../../database/models/DiagnosisModels/diabetesDiagnosis.model.js";
import { catchError } from "../../middleware/catchError.js";
import { predictDiabetes } from "../../services/aiDiagnosis.service.js";
import { AppError } from "../../utils/appError.js";

// Create Diabetes Record
const createDiabetes = catchError(async (req, res, next) => {
  const { patientId, measurements } = req.body;

  // const existing = await Diabetes.findOne({ patientId });
  // if (existing) {
  //   return next(new AppError("Diabetes record already exists for this patient.", 400));
  // }
 
  // استخدم AI prediction لتحديد إذا كانت القياسات تشير إلى مرض
  const diagnosisResult = await predictDiabetes(measurements);

  const record = new Diabetes({ patientId, measurements, diagnosisResult });
  await record.save();

  res.status(201).json({ message: "Diabetes record created.", data: record });
});

// Get Diabetes Record
const getDiabetes = catchError(async (req, res, next) => {
  const { patientId } = req.params;

  const record = await Diabetes.findOne({ patientId });
  if (!record) {
    return next(new AppError("No diabetes record found.", 404));
  }

  res.status(200).json({ message: "Success", data: record });
});

// Update Diabetes Record
const updateDiabetes = catchError(async (req, res, next) => {
  const { patientId } = req.params;
  const { measurements } = req.body;

  // استخدم AI prediction لتحديد إذا كانت القياسات تشير إلى مرض
  const diagnosisResult = await predictDiabetes(measurements);

  const updated = await Diabetes.findOneAndUpdate(
    { patientId },
    { measurements, diagnosisResult, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return next(new AppError("No diabetes record to update.", 404));
  }

  res.status(200).json({ message: "Diabetes record updated.", data: updated });
});

export {
  createDiabetes,
  getDiabetes,
  updateDiabetes
};
