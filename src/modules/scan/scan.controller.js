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











import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";

const scanProductImage = catchError(async (req, res, next) => {
  const { disease } = req.body;

  if (!disease || !["diabetes", "pressure", "anemia", "heart"].includes(disease)) {
    return next(new AppError('Please provide a valid disease type: diabetes, pressure, anemia, heart', 400));
  }

  if (!req.file) {
    return next(new AppError('No image uploaded', 400));
  }

  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));
    form.append('disease', disease);

    console.log('Sending request to AI service with:', {
      disease,
      file: req.file.originalname
    });

    const aiResponse = await axios.post('https://3laasayed-ocr.hf.space/predict', form, {
      headers: {
        ...form.getHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('AI Service Response:', aiResponse.data);

    if (!aiResponse.data) {
      return next(new AppError('No response data from AI service', 500));
    }

    // Check if the response has the expected structure
    if (!aiResponse.data.result || !aiResponse.data.values) {
      console.warn('Unexpected response structure:', aiResponse.data);
      // You might want to handle this case differently
      return res.status(200).json({
        success: true,
        rawResponse: aiResponse.data // Forward the raw response for debugging
      });
    }

    const { result, values } = aiResponse.data;

    res.status(200).json({
      success: true,
      result,
      values
    });

  } catch (error) {
    console.error('Error calling AI service:', error);
    if (error.response) {
      console.error('AI service responded with error:', error.response.data);
      return next(new AppError(`AI service error: ${error.response.data.message || error.response.statusText}`, error.response.status));
    }
    return next(new AppError('Error communicating with AI service', 500));
  } finally {
    // Clean up the uploaded file
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) console.error('Error deleting temp file:', err);
      });
    }
  }
});

export { scanProductImage };







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
