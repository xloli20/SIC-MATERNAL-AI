from pydantic import BaseModel, Field

class PatientData(BaseModel):
    age: int = Field(..., example=28)
    systolic_bp: int = Field(..., example=120)
    diastolic_bp: int = Field(..., example=80)
    blood_sugar: float = Field(..., example=90.0)
    body_temperature: float = Field(..., example=98.6)
    heart_rate: int = Field(..., example=75)