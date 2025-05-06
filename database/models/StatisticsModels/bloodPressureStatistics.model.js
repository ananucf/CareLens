import mongoose from 'mongoose';

const pressureSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exerciseHours: {
    type: Number,
    required: true,
  },
  bloodPressureLevel: {
    type: String, // Format: "120/80"
    required: true,
  },
  systolic: {
    type: Number,
    required: true,
  },
  diastolic: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
    default: function() {
      // Calculate BMI if weight and height are provided (weight in kg, height in m)
      if (this.weight && this.height) {
        return this.weight / ((this.height/100) * (this.height/100));
      }
      return null;
    }
  }
}, { timestamps: true, versionKey: false });

export const Pressure = mongoose.model('PressureStat', pressureSchema);