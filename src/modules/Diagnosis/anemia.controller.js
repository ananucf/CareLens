import { Anemia } from "../../../database/models/DiagnosisModels/anemiaDiagnosis.model.js";
import { catchError } from "../../middleware/catchError.js";
import { predictAnemia } from "../../services/aiDiagnosis.service.js";
import { AppError } from "../../utils/appError.js";

// Create Anemia Record
const createAnemia = catchError(async (req, res, next) => {
  const { patientId, measurements } = req.body;

  // const existing = await Anemia.findOne({ patientId });
  // if (existing) {
  //   return next(new AppError("Anemia record already exists for this patient.", 400));
  // }
 
  // استخدم AI prediction لتحديد إذا كانت القياسات تشير إلى مرض
  const diagnosisResult = await predictAnemia(measurements);

  const record = new Anemia({ patientId, measurements, diagnosisResult });
  await record.save();

  res.status(201).json({ message: "Anemia record created.", data: record });
});

// Get Anemia Record
const getAnemia = catchError(async (req, res, next) => {
  const { patientId } = req.params;

  const record = await Anemia.findOne({ patientId });
  if (!record) {
    return next(new AppError("No anemia record found.", 404));
  }

  res.status(200).json({ message: "Success", data: record });
});

// Update Anemia Record
const updateAnemia = catchError(async (req, res, next) => {
  const { patientId } = req.params;
  const { measurements } = req.body;

  // استخدم AI prediction لتحديد إذا كانت القياسات تشير إلى مرض
  const diagnosisResult = await predictAnemia(measurements);

  const updated = await Anemia.findOneAndUpdate(
    { patientId },
    { measurements, diagnosisResult, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return next(new AppError("No anemia record to update.", 404));
  }

  res.status(200).json({ message: "Anemia record updated.", data: updated });
});

export {
  createAnemia,
  getAnemia,
  updateAnemia
};
