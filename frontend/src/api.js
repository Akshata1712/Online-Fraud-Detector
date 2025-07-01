import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

// Single prediction
export const predictSingleTransaction = async (formData) => {
  const dataToSend = {
    ...formData,
    type: typeMapping[formData.type],  // Map string to int
  };

  const response = await axios.post(`${API_BASE_URL}/predict-explain`, dataToSend);
  return response.data;
};


// Batch prediction
export const uploadBatchCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(`${API_BASE_URL}/batch-predict`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
const typeMapping = {
  PAYMENT: 0,
  TRANSFER: 1,
  CASH_OUT: 2,
  DEBIT: 3,
  CASH_IN: 4,
};

