import axios from 'axios';

export const predictDropout = async (payload) => {
  const { data } = await axios.post(`${process.env.ML_SERVICE_URL}/predict`, payload);
  return data;
};
