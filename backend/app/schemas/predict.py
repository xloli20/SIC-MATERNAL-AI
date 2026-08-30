from pydantic import BaseModel
from typing import Dict

class PredictResponse(BaseModel):
    risk_level: str
    confidence: float
    probabilities: Dict[str, float]
    