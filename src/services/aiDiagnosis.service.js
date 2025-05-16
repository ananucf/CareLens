// src/services/aiDiagnosis.service.js

export const predictAnemia = async (measurements) => {
  // Dummy AI logic for anemia
  const { hemoglobin, mch, mchc, mcv } = measurements;
  if (hemoglobin < 12 || mch < 27 || mchc < 32 || mcv < 80) {
    return 'positive';
  }
  return 'negative';
}; 

export const predictBloodPressure = async (measurements) => {
  const { systolic, diastolic } = measurements;
  if (systolic > 140 || diastolic > 90) {
    return 'positive';
  }
  return 'negative';
};

export const predictDiabetes = async (measurements) => {
  const { fasting, postMeal } = measurements;
  if (fasting > 126 || postMeal > 200) {
    return 'positive';
  }
  return 'negative';
};

export const predictHeart = async (measurements) => {
  const { cholesterol, restingBP, age } = measurements;
  if (cholesterol > 240 || restingBP > 140 || age > 60) {
    return 'positive';
  }
  return 'negative';
};
