from app.schemas.patient import PatientData
from app.schemas.predict import PredictResponse


def calculate_engineered_features(systolic_bp: float, diastolic_bp: float):
    """
    Computes Pulse Pressure (PP) and Mean Arterial Pressure (MAP)
    based on clinical standards.
    """
    pulse_pressure = systolic_bp - diastolic_bp
    mean_arterial_pressure = diastolic_bp + (pulse_pressure / 3.0)
    return pulse_pressure, round(mean_arterial_pressure, 2)


class MLService:
    def __init__(self):
        # Placeholders for the trained model & encoders from ML team
        self.model = None

    def predict(self, data: PatientData) -> PredictResponse:
        # 1. Feature Engineering: Calculate PP and MAP internally
        pp, map_val = calculate_engineered_features(data.systolic_bp, data.diastolic_bp)

        # 2. Ordered feature vector matching the model dataset:
        # ['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp', 'HeartRate', 'PulsePressure', 'MeanArterialPressure']
        features = [
            data.age,
            data.systolic_bp,
            data.diastolic_bp,
            data.blood_sugar,
            data.body_temp,
            data.heart_rate,
            pp,
            map_val,
        ]

        # 3. Dynamic Mock Logic based on real clinical thresholds until model weights are loaded
        if data.systolic_bp >= 140 or data.blood_sugar >= 11.0 or pp >= 60:
            risk = "high risk"
            confidence = 0.88
            probs = {"high risk": 0.88, "mid risk": 0.09, "low risk": 0.03}
        elif data.systolic_bp >= 120 or data.blood_sugar >= 7.8:
            risk = "mid risk"
            confidence = 0.74
            probs = {"high risk": 0.12, "mid risk": 0.74, "low risk": 0.14}
        else:
            risk = "low risk"
            confidence = 0.92
            probs = {"high risk": 0.02, "mid risk": 0.06, "low risk": 0.92}

        return PredictResponse(
            risk_level=risk,
            confidence=confidence,
            probabilities=probs
        )


# Global singleton instance
ml_service = MLService()