import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="Smart Plant Monitoring ML Service")

# Allow CORS for backend and direct frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = os.path.join(os.path.dirname(__file__), "models", "crop_rf_model.joblib")
model = joblib.load(model_path)

class CropRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@app.get("/")
def root():
    return {"status": "running", "service": "Crop Recommendation ML Service"}

@app.post("/predict-crop")
def predict_crop(data: CropRequest):
    X = np.array([[data.N, data.P, data.K, data.temperature,
                   data.humidity, data.ph, data.rainfall]])
    pred = model.predict(X)[0]
    return {"recommended_crop": pred}
