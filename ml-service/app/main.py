from pathlib import Path
import os
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title='Dropout Risk ML Service')

BASE_DIR = Path(__file__).resolve().parents[1]
MODEL_PATH = BASE_DIR / os.getenv('MODEL_PATH', 'model/dropout_model.joblib')


class PredictionInput(BaseModel):
    attendance_percentage: float
    academic_performance: float
    socioeconomic_score: float
    gender: str
    distance_from_school: float
    previous_failures: int
    behavioral_flags: int


@app.get('/health')
def health():
    return {'status': 'ok'}


@app.post('/predict')
def predict(payload: PredictionInput):
    if not MODEL_PATH.exists():
      raise HTTPException(status_code=500, detail='Model file not found. Run training script first.')

    model = joblib.load(MODEL_PATH)
    frame = pd.DataFrame([payload.model_dump()])
    prob = float(model.predict_proba(frame)[0][1])
    risk_score = round(prob * 100, 2)

    if risk_score < 35:
        category = 'Low Risk'
    elif risk_score < 70:
        category = 'Medium Risk'
    else:
        category = 'High Risk'

    return {'riskScore': risk_score, 'riskCategory': category}
