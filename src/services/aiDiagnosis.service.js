// // src/services/aiDiagnosis.service.js

// export const predictAnemia = async (measurements) => {
//   // Dummy AI logic for anemia
//   const { hemoglobin, mch, mchc, mcv } = measurements;
//   if (hemoglobin < 12 || mch < 27 || mchc < 32 || mcv < 80) {
//     return 'positive';
//   }
//   return 'negative';
// }; 

// export const predictBloodPressure = async (measurements) => {
//   const { systolic, diastolic } = measurements;
//   if (systolic > 140 || diastolic > 90) {
//     return 'positive';
//   }
//   return 'negative';
// };

// export const predictDiabetes = async (measurements) => {
//   const { fasting, postMeal } = measurements;
//   if (fasting > 126 || postMeal > 200) {
//     return 'positive';
//   }
//   return 'negative';
// };

// export const predictHeart = async (measurements) => {
//   const { cholesterol, restingBP, age } = measurements;
//   if (cholesterol > 240 || restingBP > 140 || age > 60) {
//     return 'positive';
//   }
//   return 'negative';
// };






import axios from 'axios';

export const predictAnemia = async (measurements) => {
  try {
    const response = await axios.post('https://Alzahraa5-anemia.hf.space/predict', { measurements });
    return response.data.result; // expected: 'positive' or 'negative'
  } catch (error) {
    console.error("AI Error (Anemia):", error.message);
    throw new Error("Failed to predict anemia.");
  }
};

export const predictBloodPressure = async (measurements) => {
  try {
    const response = await axios.post('http://localhost:5000/predict/blood-pressure', { measurements });
    return response.data.result;
  } catch (error) {
    console.error("AI Error (Blood Pressure):", error.message);
    throw new Error("Failed to predict blood pressure.");
  }
};

export const predictDiabetes = async (measurements) => {
  try {
    const response = await axios.post('https://Alzahraa5-diabetes.hf.space/predict', { measurements });
    return response.data.result;
  } catch (error) {
    console.error("AI Error (Diabetes):", error.message);
    throw new Error("Failed to predict diabetes.");
  }
};

export const predictHeart = async (measurements) => {
  try {
    const response = await axios.post('https://Alzahraa5-heart.hf.space/predic', { measurements });
    return response.data.result;
  } catch (error) {
    console.error("AI Error (Heart):", error.message);
    throw new Error("Failed to predict heart disease.");
  }
};
