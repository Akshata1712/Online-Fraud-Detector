import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from xgboost import XGBClassifier
import joblib

print("Training started...")

# Load dataset
data = pd.read_csv("dataset.csv")

# Encode 'type'
le = LabelEncoder()
data['type'] = le.fit_transform(data['type'])

# ✅ Drop unused columns including 'step'
data.drop(['nameOrig', 'nameDest', 'step', 'isFlaggedFraud'], axis=1, inplace=True)


# Split features and target
X = data.drop('isFraud', axis=1)
y = data['isFraud']

# Print columns to confirm
print("Training with features:", list(X.columns))  # ✅ This will show exactly which columns are used

# Normalize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, stratify=y, random_state=42)

# Train XGBoost
model = XGBClassifier(use_label_encoder=False, eval_metric="logloss", scale_pos_weight=10)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'xgb_model.pkl')

print("Model training completed and saved.")
