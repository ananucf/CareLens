import mongoose from 'mongoose';

const diabetesSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    measurements: {
        age: { type: Number, required: true }, 
        gender: { 
            type: String, 
            enum: ['Male', 'Female'],
            required: true 
        }, 
        bmi: { type: Number, required: true },
        highBloodPressure: { type: Boolean, required: true },
        fastingBloodSugar: { type: Number, required: true }, // mg/dL
        hba1c: { type: Number, required: true }, // percentage
        smoking: { type: Boolean, required: true }
    },
    diagnosisResult: {
        type: String,
        enum: ['positive', 'negative'], // $$$$$
        required: true
    }
}, { timestamps: true, versionKey: false });

export const Diabetes = mongoose.model('Diabetes', diabetesSchema);