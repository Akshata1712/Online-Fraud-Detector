# FraudSight — Online Fraud Detection Dashboard

A modern, interactive fraud detection dashboard that uses machine learning to predict transaction fraud probabilities in real time and in batches. It integrates a clean **React + Tailwind** frontend with a **FastAPI backend** powered by an **XGBoost model**, with transaction-level explainability.

---

## Features

- **Real-time Fraud Prediction:** Instantly analyze single transactions and get fraud probabilities.
- **Batch Prediction via CSV Upload:** Upload transaction datasets to bulk classify multiple transactions at once.
- **Explainability:** Visualize top contributing factors driving fraud predictions.
- **Interactive Dashboard:** Clean, responsive frontend with live status indicators, styled cards, charts, and risk meters.
- **API-Based Architecture:** Decoupled FastAPI backend for model serving.
- **Modern UI:** TypeScript + Tailwind CSS components using **shadcn/ui** and **lucide-react icons**.

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui + recharts  
- **Backend:** FastAPI + Python + XGBoost + Pandas  
- **Model:** Pre-trained XGBoost binary classifier (pickled `.pkl`)  
- **Visualization:** Recharts for bar charts, CircularProgressbar for risk gauges  
- **Explainability:** XGBoost’s `pred_contribs` for SHAP-like feature attributions  

---

## 📁 Project Structure

FraudDetection/
├── backend/
│ ├── main.py
│ ├── model/
│ │ └── xgb_model.pkl
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api.js
│ │ └── main.tsx
│ ├── index.css
│ ├── vite.config.ts
│ └── tailwind.config.ts
│
└── README.md

---

## Setup Instructions

### Install Dependencies

**Backend (FastAPI + ML model)**
```bash
cd backend
pip install -r requirements.txt

Frontend (React + Vite + Tailwind)
cd frontend
npm install

How to Run
Start Backend (FastAPI)
 uvicorn main:app --reload
 Runs on: http://127.0.0.1:8000

Start Frontend (React)
 npm run dev
 Runs on: http://localhost:5173/

📊 API Endpoints
Health Check
GET /

Single Transaction Prediction
POST /predict-explain

Request body:

{
  "type": 1,
  "amount": 1000.0,
  "oldbalanceOrg": 5000.0,
  "newbalanceOrig": 4000.0,
  "oldbalanceDest": 2000.0,
  "newbalanceDest": 3000.0
}
Response:

{
  "isFraud": 1,
  "fraudProbability": 0.82,
  "explanations": [
    { "feature": "amount", "impact": 0.56 },
    { "feature": "type", "impact": 0.24 },
    { "feature": "oldbalanceOrg", "impact": -0.12 }
  ]
}
Batch CSV Prediction
POST /batch-predict

Multipart CSV file upload with columns:
type,amount,oldbalanceOrg,newbalanceOrig,oldbalanceDest,newbalanceDest

Important Notes
- The backend model is a pre-trained XGBoost binary classifier.
- Feature explainability uses pred_contribs method from XGBoost (SHAP-like).
- The frontend includes a fraud risk gauge, fraud distribution bar chart, and a live transaction predictor.
- CORS is enabled via FastAPI middleware for local frontend-backend communication.
- Data visualization powered by Recharts and CircularProgressbar.

Troubleshooting
- CORS Errors: Ensure CORSMiddleware is correctly configured in main.py.
- Port Conflicts: Make sure no other service is running on ports 8000 or 5173.
- CSV Errors: Uploaded CSV must match the required format.

Future Improvements
- Add support for LSTM/ARIMA models for more accurate fraud detection.
- Integrate user authentication and history logs for previous predictions.
- Extend explainability with full SHAP visualizations.

Dockerize the full stack for easier deployment.




