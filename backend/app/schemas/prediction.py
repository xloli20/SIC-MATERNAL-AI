from pydantic import BaseModel

class PredictionRequest(BaseModel):
    # Define input features later
    pass

class PredictionResponse(BaseModel):
    risk_level: str
