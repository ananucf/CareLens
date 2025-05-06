import mongoose from 'mongoose';

const heartSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    measurements: {
        chestPainType: {
            type: String,
            enum: ['ATA', 'NAP', 'ASY', 'TA'],
            required: true
        },
        age: { type: Number, required: true }, 
        gender: { 
            type: String, 
            enum: ['M', 'F'],
            required: true 
        }, // $$$$$$$
        restingBP: { type: Number, required: true }, // mm Hg
        cholesterol: { type: Number, required: true }, // mg/dL
        fastingBloodSugar: { type: Boolean, required: true },
        restingECG: {
            type: String,
            enum: ['Normal', 'ST', 'LVH'],
            required: true
        },
        maxHeartRate: { type: Number, required: true }, // bpm
        exerciseAngina: { type: Boolean, required: true },
        oldpeak: { type: Number, required: true }, // ST Depression
        stSlope: {
            type: String,
            enum: ['Up', 'Flat', 'Down'],
            required: true
        }
    },
    diagnosisResult: {
        type: String,
        enum: ['positive', 'negative'], // $$$$$
        required: true
    }
}, { timestamps: true, versionKey: false });

export const Heart = mongoose.model('Heart', heartSchema);