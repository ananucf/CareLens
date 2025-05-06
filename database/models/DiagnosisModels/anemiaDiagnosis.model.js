import mongoose from 'mongoose';

const anemiaSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    measurements: {
        gender: { type: Boolean, required: true }, 
        hemoglobin: { type: Number, required: true }, // g/dL
        mch: { type: Number, required: true }, // pg
        mchc: { type: Number, required: true }, // g/dL
        mcv: { type: Number, required: true } // fL
    },
    diagnosisResult: {
        type: String,
        enum: ['positive', 'negative'], // $$$$$
        required: true
    }
}, { timestamps: true, versionKey: false });

export const Anemia = mongoose.model('Anemia', anemiaSchema);