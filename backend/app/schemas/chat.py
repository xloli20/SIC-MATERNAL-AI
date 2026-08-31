from pydantic import BaseModel, Field
from app.schemas.patient import PatientData

class ChatRequest(BaseModel):
    message: str = Field(..., example="What does my result mean?")
    patient_data: PatientData
    risk_level: str = Field(..., example="low risk")

class ChatResponse(BaseModel):
    response: str