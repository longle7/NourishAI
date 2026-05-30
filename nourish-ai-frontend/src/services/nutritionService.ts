import api from './api';

export const getNutritionSummary = async () => {
  const res = await api.get('/nutrition/summary');
  return res.data;
};