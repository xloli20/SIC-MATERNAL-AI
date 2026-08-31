from app.schemas.patient import PatientData
from app.schemas.predict import PredictResponse

class MLService:
    @staticmethod
    def get_prediction(data: PatientData) -> PredictResponse:
        return PredictResponse(
            risk_level="low risk",
            confidence=0.87,
            probabilities={
                "low risk": 0.87,
                "mid risk": 0.10,
                "high risk": 0.03
            }
        )

ml_service = MLService()