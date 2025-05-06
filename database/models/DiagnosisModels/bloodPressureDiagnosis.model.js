import mongoose from 'mongoose';

const bloodPressureSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  measurements: {
    hemoglobin: { type: Number, required: true }, // g/dL
    age: { type: Number, required: true }, 
    bmi: { type: Number, required: true },
    gender: { type: Boolean, required: true }, 
    smoking: { type: Boolean, required: true }, 
    physicalActivity: { type: Number, required: true }, // steps per week
    saltIntake: { type: Number, required: true }, // grams per day
    chronicKidneyDisease: { type: Boolean, required: true },
    endocrineDisorders: { type: Boolean, required: true }
  },
  diagnosisResult: {
    type: String,
    enum: ['positive', 'negative'], // $$$$$
    required: true
  }
}, { timestamps: true, versionKey: false });

export const BloodPressure = mongoose.model('BloodPressure', bloodPressureSchema);