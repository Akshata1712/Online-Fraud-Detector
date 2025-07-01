from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware
import io
import numpy as np
import xgboost as xgb
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for testing — allow everything
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load trained model
model = joblib.load("model/xgb_model.pkl")
booster = model.get_booster()

# Initialize FastAPI app
app = FastAPI()

# CORS settings for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema for single prediction
class TransactionInput(BaseModel):
    type: int
    amount: float
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float

# Health check route
@app.get("/")
def read_root():
    return {"message": "Fraud Detection API running ✅"}

# Single prediction + explainability
@app.post("/predict-explain")
def predict_explain(input: TransactionInput):
    data_dict = input.dict()
    input_df = pd.DataFrame([data_dict])

    probabilities = model.predict_proba(input_df)
    fraud_probability = float(probabilities[0][1])   # Convert to native float
    is_fraud = int(fraud_probability >= 0.5)

    # Explainability: feature contributions
    dmatrix = xgb.DMatrix(input_df)
    contribs = booster.predict(dmatrix, pred_contribs=True)
    feature_names = input_df.columns.tolist()

    impacts = sorted(
        [{"feature": f, "impact": float(round(contribs[0][i], 4))} for i, f in enumerate(feature_names)],
        key=lambda x: abs(x["impact"]), reverse=True
    )[:3]

    return {
        "isFraud": is_fraud,
        "fraudProbability": fraud_probability,
        "explanations": impacts
    }


# Batch CSV prediction + analysis
@app.post("/batch-predict")
async def batch_predict(file: UploadFile = File(...)):
    contents = await file.read()
    data = pd.read_csv(io.StringIO(contents.decode("utf-8")))

    # Keep only required columns
    required_columns = ["type", "amount", "oldbalanceOrg", "newbalanceOrig", "oldbalanceDest", "newbalanceDest"]
    data = data[required_columns]

    # Map type names to numeric codes if needed
    if data["type"].dtype == object:
        type_mapping = {
            "PAYMENT": 0,
            "TRANSFER": 1,
            "CASH_OUT": 2,
            "DEBIT": 3,
            "CASH_IN": 4
        }
        data["type"] = data["type"].map(type_mapping)

    # Ensure numeric types
    data = data.astype(float)

    # Predict probabilities
    probabilities = model.predict_proba(data)[:, 1]
    predictions = (probabilities >= 0.5).astype(int)

    # Summary stats
    total_transactions = len(data)
    total_frauds = int(predictions.sum())
    avg_probability = float(np.mean(probabilities))

    # Type-wise fraud count
    type_counts = data.copy()
    type_counts["isFraud"] = predictions
    type_summary = type_counts.groupby("type")["isFraud"].sum().to_dict()

    # Top 5 risky transactions
    data["fraudProbability"] = probabilities
    top_5 = data.sort_values("fraudProbability", ascending=False).head(5).to_dict(orient="records")

    return {
        "totalTransactions": total_transactions,
        "totalFrauds": total_frauds,
        "averageFraudProbability": avg_probability,
        "typeWiseFrauds": type_summary,
        "top5Risks": top_5
    }
