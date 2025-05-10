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

import axios from 'axios';
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";

// دالة لتحليل الصورة باستخدام AI
const scanProductImage = catchError(async (req, res, next) => {
  const { disease } = req.body; // استلام نوع المرض من جسم الطلب

  // التأكد من أن المرض تم إدخاله
  if (!disease || !["diabetes", "pressure", "anemia", "heart"].includes(disease)) {
    return next(new AppError('Please provide a valid disease type: diabetes, pressure, anemia, heart', 400));
  }

  // التأكد من أن الصورة تم رفعها
  if (!req.file) {
    return next(new AppError('No image uploaded', 400));
  }

  const imagePath = req.file.path; // مسار الصورة على السيرفر

  // إرسال الصورة ونوع المرض لسيرفر AI للتحليل
  const aiResponse = await axios.post('https://3laasayed-ocr.hf.space/analyze', {
    imagePath,
    disease, // إرسال نوع المرض
  });

  // استلام النتيجة من AI (مناسب أو غير مناسب)
  const { suitable, message } = aiResponse.data;

  // إرسال النتيجة للمستخدم فورًا
  res.status(200).json({ 
    success: true,
    suitable,
    message, // مثل: "هذا المنتج غير مناسب لمرضى السكري"
  });
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
