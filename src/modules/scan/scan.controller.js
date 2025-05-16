import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import sharp from 'sharp';
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";

export const scanProductImage = catchError(async (req, res, next) => {
  const { disease } = req.body;

  if (!req.file && !disease) {
    return res.status(200).json({
      success: false,
      message: 'No image or disease provided. Please submit at least one.',
    });
  }

  try {
    const form = new FormData();

    if (req.file) {
      const resizedImage = await sharp(req.file.path)
        .resize(500, 500)
        .toBuffer();
      form.append('file', resizedImage, { filename: 'resized.jpg' });
    }

    if (disease) {
      if (!["diabetes", "pressure", "anemia", "heart"].includes(disease)) {
        return next(new AppError('Invalid disease type. Must be: diabetes, pressure, anemia, heart', 400));
      }
      form.append('disease', disease);
    }

    const aiResponse = await axios.post(
      'https://3laasayed-ocr.hf.space/analyze',
      form,
      {
        headers: form.getHeaders(),
        timeout: 30000,
      }
    );

    return res.status(200).json(aiResponse.data);

  } catch (error) {
    console.error("AI Service Error:", error.message);
    return next(new AppError('Failed to get response from AI service', 502));
  } finally {
    if (req.file) {
      fs.unlink(req.file.path, (err) => err && console.error("Failed to delete temp file:", err));
    }
  }
});
