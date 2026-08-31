from fastapi import APIRouter
from app.schemas.patient import PatientData
from app.schemas.predict import PredictResponse
from app.services.ml_service import ml_service

router = APIRouter()

@router.post("/predict", response_model=PredictResponse, tags=["Prediction"])
def predict_risk(data: PatientData):
    return ml_service.get_prediction(data)