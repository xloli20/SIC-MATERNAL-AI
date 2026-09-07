import os
import joblib
import pandas as pd
from typing import Dict, Any

class MLService:
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.model_path = os.path.join(self.base_dir, "xgboost_model.pkl")
        self.encoder_path = os.path.join(self.base_dir, "label_encoder.pkl")
        
        self.model = None
        self.label_encoder = None
        self.fallback_label_map = {
            0: "high risk",
            1: "low risk",
            2: "mid risk"
        }
        self.load_model()

    def load_model(self):
        try:
            if os.path.exists(self.model_path):
                self.model = joblib.load(self.model_path)
            if os.path.exists(self.encoder_path):
                self.label_encoder = joblib.load(self.encoder_path)
        except Exception as e:
            print(f"Error loading model or encoder: {e}")

    def predict(self, data: Any) -> Dict[str, Any]:
        if self.model is None:
            self.load_model()
            if self.model is None:
                raise RuntimeError("ML model is not loaded. Ensure xgboost_model.pkl exists.")

        
        if hasattr(data, "model_dump"):
            d = data.model_dump()
        elif hasattr(data, "dict"):
            d = data.dict()
        elif isinstance(data, dict):
            d = data
        else:
            d = dict(data)

        
        age = float(d.get("Age", d.get("age", 0)))
        systolic_bp = float(d.get("SystolicBP", d.get("systolic_bp", 0)))
        diastolic_bp = float(d.get("DiastolicBP", d.get("diastolic_bp", 0)))
        bs = float(d.get("BS", d.get("bs", d.get("blood_sugar", 0))))
        body_temp = float(d.get("BodyTemp", d.get("body_temp", d.get("body_temperature", 0))))
        heart_rate = float(d.get("HeartRate", d.get("heart_rate", 0)))

        
        pulse_pressure = systolic_bp - diastolic_bp
        mean_arterial_pressure = diastolic_bp + (pulse_pressure / 3.0)

        
        features = pd.DataFrame([{
            "Age": age,
            "SystolicBP": systolic_bp,
            "DiastolicBP": diastolic_bp,
            "BS": bs,
            "BodyTemp": body_temp,
            "HeartRate": heart_rate,
            "PulsePressure": pulse_pressure,
            "MeanArterialPressure": mean_arterial_pressure
        }])

        
        encoded_pred = int(self.model.predict(features)[0])

        if self.label_encoder is not None:
            risk_level = str(self.label_encoder.inverse_transform([encoded_pred])[0])
        else:
            risk_level = self.fallback_label_map.get(encoded_pred, "unknown")

        probabilities = {}
        confidence = 1.0
        if hasattr(self.model, "predict_proba"):
            probs = self.model.predict_proba(features)[0]
            classes = self.label_encoder.classes_ if self.label_encoder is not None else [self.fallback_label_map[i] for i in range(len(probs))]
            probabilities = {str(c): round(float(p), 4) for c, p in zip(classes, probs)}
            confidence = round(float(max(probs)), 4)

        return {
            "risk_level": risk_level,
            "confidence": confidence,
            "probabilities": probabilities
        }

    
    def get_prediction(self, data: Any) -> Dict[str, Any]:
        return self.predict(data)

    def predict_risk(self, data: Any) -> Dict[str, Any]:
        return self.predict(data)

ml_service = MLService()