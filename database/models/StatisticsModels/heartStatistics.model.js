import mongoose from 'mongoose';

const heartDiseaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exerciseHours: {
    type: Number,
    required: true,
  },
  heartRate: {
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

export const HeartDisease = mongoose.model('HeartDiseaseStat', heartDiseaseSchema);