import axios from 'axios';
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";

// دالة لتحليل الصورة باستخدام AI
const scanProductImage = catchError(async (req, res, next) => {
  // التأكد من أن الصورة تم رفعها
  if (!req.file) {
    return next(new AppError('No image uploaded', 400));
  }

  const imagePath = req.file.path; // مسار الصورة على السيرفر

  // إرسال الصورة لسيرفر AI للتحليل
  const aiResponse = await axios.post('https://3laasayed-ocr.hf.space/analyze', {
    imagePath,
  });

  // استلام النتيجة من AI (مناسب أو غير مناسب)
  const { suitable, message } = aiResponse.data; //****** */

  // إرسال النتيجة للمستخدم فورًا
  res.status(200).json({ 
    success: true,
    suitable,
    message,  // message هتكون إما مناسب أو غير مناسب
  });
});

export { scanProductImage };


/* ******************************** API WITH AI ******************************** */

// import { AppError } from "../../utils/appError.js";
// import { catchError } from "../../middleware/catchError.js";

// const scanProductImage = catchError(async (req, res, next) => {
//   // Ensure that the image has been uploaded
//   if (!req.file) {
//     return next(new AppError('No image uploaded', 400));
//   }

//   const imagePath = req.file.path; // Path of the image on the server

//   // Simulate AI server response
//   const aiResponse = {
//     data: {
//       suitable: false,  // This can be changed to false to test other cases
//       message: "The product is not suitable for your condition."
//     }
//   };

//   // Receive the response from the simulated AI
//   const { suitable, message } = aiResponse.data;

//   // Send the result to the user
//   res.status(200).json({
//     // success: true,
//     suitable,
//     message,
//   });
// });

// export { scanProductImage };
