/* database/models/productHistory.model.js */
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      productName: {
        type: String,
        required: true  
      },
      productImage: {
        type: String,
        required: true  
      },
      scanDate: {
        type: Date,
        default: Date.now
      },
      suitability: {
        type: String,
        enum: ['Good', 'Bad', 'Moderated'],
        required: true 
      }
}, { timestamps: true, versionKey: false });

export const ProductHistory = mongoose.model('ProductHistory', schema);
