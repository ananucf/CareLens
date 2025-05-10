// import axios from 'axios';
// import { AppError } from "../../utils/appError.js";
// import { catchError } from "../../middleware/catchError.js";

// // دالة لتحليل الصورة باستخدام AI
// const scanProductImage = catchError(async (req, res, next) => {
//   // التأكد من أن الصورة تم رفعها
//   if (!req.file) {
//     return next(new AppError('No image uploaded', 400));
//   }

//   const imagePath = req.file.path; // مسار الصورة على السيرفر

//   // إرسال الصورة لسيرفر AI للتحليل
//   const aiResponse = await axios.post('https://3laasayed-ocr.hf.space/analyze', {
//     imagePath,
//   });

//   // استلام النتيجة من AI (مناسب أو غير مناسب)
//   const { suitable, message } = aiResponse.data; //****** */

//   // إرسال النتيجة للمستخدم فورًا
//   res.status(200).json({ 
//     success: true,
//     suitable,
//     message,  // message هتكون إما مناسب أو غير مناسب
//   });
// });

// export { scanProductImage };

// ************************************************************************************

// import axios from 'axios';
// import { AppError } from "../../utils/appError.js";
// import { catchError } from "../../middleware/catchError.js";

// // دالة لتحليل الصورة باستخدام AI
// const scanProductImage = catchError(async (req, res, next) => {
//   const { disease } = req.body; // استلام نوع المرض من جسم الطلب

//   // التأكد من أن المرض تم إدخاله
//   if (!disease || !["diabetes", "pressure", "anemia", "heart"].includes(disease)) {
//     return next(new AppError('Please provide a valid disease type: diabetes, pressure, anemia, heart', 400));
//   }

//   // التأكد من أن الصورة تم رفعها
//   if (!req.file) {
//     return next(new AppError('No image uploaded', 400));
//   }

//   const imagePath = req.file.path; // مسار الصورة على السيرفر

//   // إرسال الصورة ونوع المرض لسيرفر AI للتحليل
//   const aiResponse = await axios.post('https://3laasayed-ocr.hf.space/predict', {
//     imagePath,
//     disease, // إرسال نوع المرض
//   });

//   // استلام النتيجة من AI (مناسب أو غير مناسب)
//   const { suitable, message } = aiResponse.data;

//   // إرسال النتيجة للمستخدم فورًا
//   res.status(200).json({ 
//     success: true,
//     suitable,
//     message, // مثل: "هذا المنتج غير مناسب لمرضى السكري"
//   });
// });

// export { scanProductImage };















// import axios from 'axios';
// import fs from 'fs';
// import FormData from 'form-data';
// import { AppError } from "../../utils/appError.js";
// import { catchError } from "../../middleware/catchError.js";

// const scanProductImage = catchError(async (req, res, next) => {
//   const { disease } = req.body;

//   if (!disease || !["diabetes", "pressure", "anemia", "heart"].includes(disease)) {
//     return next(new AppError('Please provide a valid disease type: diabetes, pressure, anemia, heart', 400));
//   }

//   if (!req.file) {
//     return next(new AppError('No image uploaded', 400));
//   }

//   const form = new FormData();
//   form.append('file', fs.createReadStream(req.file.path));
//   form.append('disease', disease);

//   const aiResponse = await axios.post('https://3laasayed-ocr.hf.space/predict', form, {
//     headers: {
//       ...form.getHeaders()
//     }
//   });

//   // نرجّع البيانات كاملة زي ما جت من الـ AI
//   const { result, values } = aiResponse.data;

//   res.status(200).json({
//     success: true,
//     result,
//     values
//   });
// });

// export { scanProductImage };








// import axios from 'axios';
// import fs from 'fs';
// import FormData from 'form-data';
// import { AppError } from "../../utils/appError.js";
// import { catchError } from "../../middleware/catchError.js";

// export const scanProductImage = catchError(async (req, res, next) => {
//   const { disease } = req.body;

//   if (!disease || !["diabetes", "pressure", "anemia", "heart"].includes(disease)) {
//     return next(new AppError('Invalid disease type. Must be: diabetes, pressure, anemia, heart', 400));
//   }

//   if (!req.file) {
//     return next(new AppError('No image uploaded', 400));
//   }

//   try {
//     const form = new FormData();
//     form.append('file', fs.createReadStream(req.file.path)); // or 'image'
//     form.append('disease', disease);

//     const aiResponse = await axios.post('https://3laasayed-ocr.hf.space/predict', form, {
//       headers: {
//         ...form.getHeaders(),
//         'Content-Type': 'multipart/form-data'
//       },
//       timeout: 60000 // 30s timeout
//     });

//     if (!aiResponse.data || aiResponse.data.status === "error") {
//       return next(new AppError('AI service failed to process the request', 502));
//     }

//     res.status(200).json({
//       success: true,
//       result: aiResponse.data.result,
//       values: aiResponse.data.values
//     });

//   } catch (error) {
//     console.error("AI Service Error:", error.message);
//     return next(new AppError('Failed to get response from AI service', 502));
//   } finally {
//     // Delete the temp file
//     fs.unlink(req.file.path, (err) => err && console.error("Failed to delete temp file:", err));
//   }
// });








// import axios from 'axios';
// import fs from 'fs';
// import FormData from 'form-data';
// import sharp from 'sharp';
// import { AppError } from "../../utils/appError.js";
// import { catchError } from "../../middleware/catchError.js";

// export const scanProductImage = catchError(async (req, res, next) => {
//   const { disease } = req.body;

//   if (!disease || !["diabetes", "pressure", "anemia", "heart"].includes(disease)) {
//     return next(new AppError('Invalid disease type. Must be: diabetes, pressure, anemia, heart', 400));
//   }

//   if (!req.file) {
//     return next(new AppError('No image uploaded', 400));
//   }

//   try {
//     // Resize image to prevent AI service crashes
//     const resizedImage = await sharp(req.file.path)
//       .resize(500, 500)
//       .toBuffer();

//     const form = new FormData();
//     form.append('file', resizedImage, { filename: 'resized.jpg' });
//     form.append('disease', disease);

//     const aiResponse = await axios.post(
//       'https://3laasayed-ocr.hf.space/predict',
//       form,
//       {
//         headers: {
//           ...form.getHeaders(),
//           'Content-Type': 'multipart/form-data',
//         },
//         timeout: 30000, // 30s timeout
//       }
//     );

//     if (!aiResponse.data || aiResponse.data.status === "error") {
//       return next(new AppError('AI service failed to process the request', 502));
//     }

//     res.status(200).json({
//       success: true,
//       result: aiResponse.data.result,
//       values: aiResponse.data.values,
//     });

//   } catch (error) {
//     console.error("AI Service Error:", error.message);
//     return next(new AppError('Failed to get response from AI service', 502));
//   } finally {
//     // Delete the temp file
//     fs.unlink(req.file.path, (err) => err && console.error("Failed to delete temp file:", err));
//   }
// });




import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import sharp from 'sharp';
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";

export const scanProductImage = catchError(async (req, res, next) => {
  const { disease } = req.body;

  try {
    const form = new FormData();

    // Handle image if provided
    if (req.file) {
      const resizedImage = await sharp(req.file.path)
        .resize(500, 500)
        .toBuffer();

      form.append('file', resizedImage, { filename: 'resized.jpg' });
    }

    // Handle disease if provided
    if (disease) {
      if (!["diabetes", "pressure", "anemia", "heart"].includes(disease)) {
        return next(new AppError('Invalid disease type. Must be: diabetes, pressure, anemia, heart', 400));
      }
      form.append('disease', disease);
    }

    // If neither image nor disease provided, just respond politely
    if (!req.file && !disease) {
      return res.status(200).json({
        success: false,
        message: 'No image or disease provided. Please submit at least one to perform a scan.',
      });
    }

    const aiResponse = await axios.post(
      'https://3laasayed-ocr.hf.space/predict',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      }
    );

    if (!aiResponse.data || aiResponse.data.status === "error") {
      return next(new AppError('AI service failed to process the request', 502));
    }

    res.status(200).json({
      success: true,
      result: aiResponse.data.result,
      values: aiResponse.data.values,
    });

  } catch (error) {
    console.error("AI Service Error:", error.message);
    return next(new AppError('Failed to get response from AI service', 502));
  } finally {
    if (req.file) {
      fs.unlink(req.file.path, (err) => err && console.error("Failed to delete temp file:", err));
    }
  }
});






// ************************************************************************************

// // scan.controller.js
// import axios from 'axios';
// import { AppError } from "../../utils/appError.js";
// import { catchError } from "../../middleware/catchError.js";

// const scanProductImage = catchError(async (req, res, next) => {
//   if (!req.file) {
//     return next(new AppError('No image uploaded', 400));
//   }

//   const imagePath = req.file.path;
//   const disease = req.body.disease;

//   if (!disease || !["diabetes", "heart", "pressure", "anemia"].includes(disease)) {
//     return next(new AppError('Invalid disease specified', 400));
//   }

//   const aiResponse = await axios.post('https://3laasayed-ocr.hf.space/analyze', {
//     imagePath,
//   });

//   const { extracted_text, bad_for, nutrient_percentages } = aiResponse.data;

//   const isSuitable = !bad_for.includes(disease);
//   const message = isSuitable
//     ? "This product is suitable for your condition."
//     : `This product is not suitable for your condition: ${disease}.`;

//   const rawNutrition = nutrient_percentages[disease] || {};
//   const nutritionInfo = {};
//   for (const key in rawNutrition) {
//     nutritionInfo[key] = `${rawNutrition[key].toFixed(2)}%`;
//   }

//   console.log({
//     success: true,
//     productAnalysis: {
//       summary: {
//         disease,
//         isSuitable,
//         message,
//       },
//       nutritionInfo,
//       details: {
//         extractedText: extracted_text,
//         badFor: bad_for,
//       }
//     }
//   });
  

//   res.status(200).json({
//     success: true,
//     productAnalysis: {
//       summary: {
//         disease,
//         isSuitable,
//         message,
//       },
//       nutritionInfo,
//       details: {
//         extractedText: extracted_text,
//         badFor: bad_for,
//       }
//     }
//   });
// });


// export default scanProductImage;  // تصدير الدالة لاستخدامها في أماكن أخرى
