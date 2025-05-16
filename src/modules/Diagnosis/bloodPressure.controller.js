import { BloodPressure } from "../../../database/models/DiagnosisModels/bloodPressureDiagnosis.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { predictBloodPressure } from "../../services/aiDiagnosis.service.js"; 

// Create Blood Pressure Record
const createPressure = catchError(async (req, res, next) => {
  const { patientId, measurements } = req.body;

  // const existing = await BloodPressure.findOne({ patientId });
  // if (existing) {
  //   return next(new AppError("Blood pressure record already exists for this patient.", 400));
  // }
 
  // استخدم AI prediction لتحديد إذا كانت القياسات تشير إلى مرض
  const diagnosisResult = await predictBloodPressure(measurements);

  const record = new BloodPressure({ patientId, measurements, diagnosisResult });
  await record.save();

  res.status(201).json({ message: "Blood pressure record created.", data: record });
});

// Get Blood Pressure Record
const getPressure = catchError(async (req, res, next) => {
  const { patientId } = req.params;

  const record = await BloodPressure.findOne({ patientId });
  if (!record) {
    return next(new AppError("No blood pressure record found.", 404));
  }

  res.status(200).json({ message: "Success", data: record });
});

// Update Blood Pressure Record
const updatePressure = catchError(async (req, res, next) => {
  const { patientId } = req.params;
  const { measurements } = req.body;

  // استخدم AI prediction لتحديد إذا كانت القياسات تشير إلى مرض
  const diagnosisResult = await predictBloodPressure(measurements);

  const updated = await BloodPressure.findOneAndUpdate(
    { patientId },
    { measurements, diagnosisResult, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return next(new AppError("No blood pressure record to update.", 404));
  }

  res.status(200).json({ message: "Blood pressure record updated.", data: updated });
});

export {
  createPressure,
  getPressure,
  updatePressure
};
