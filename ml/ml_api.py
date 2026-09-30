from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

model = joblib.load("models/crop_rf_model.joblib")

class CropRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@app.post("/predict-crop")
def predict_crop(data: CropRequest):
    X = np.array([[data.N, data.P, data.K, data.temperature,
                   data.humidity, data.ph, data.rainfall]])
    pred = model.predict(X)[0]
    return {"recommended_crop": pred}
