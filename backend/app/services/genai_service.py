import os
from dotenv import load_dotenv
import google.generativeai as genai
from app.schemas.chat import ChatRequest, ChatResponse

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class GenAIService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-3.6-flash')
        self.first_message = {}
    
    def generate_initial_response(self, patient_data, risk_level: str) -> str:
        prompt = f"""You are a friendly maternal health assistant speaking directly to this patient.

Her numbers: Age {patient_data.age}, Blood Pressure {patient_data.systolic_bp}/{patient_data.diastolic_bp}, Sugar {patient_data.blood_sugar}, Temperature {patient_data.body_temperature}, Heart Rate {patient_data.heart_rate}. Risk level is {risk_level}.

Start by greeting her warmly and commenting on her specific numbers. Then give her 3 practical suggestions based on what you see in her numbers. Keep it conversational and natural. No special formatting."""
        
        response = self.model.generate_content(prompt)
        return response.text
    
    def answer_user_question(self, patient_data, risk_level: str, question: str) -> str:
        prompt = f"""You are a maternal health assistant speaking to a patient.

Her numbers: Age {patient_data.age}, Blood Pressure {patient_data.systolic_bp}/{patient_data.diastolic_bp}, Sugar {patient_data.blood_sugar}, Temperature {patient_data.body_temperature}, Heart Rate {patient_data.heart_rate}.

She asked: {question}

Answer her naturally based on her specific numbers. Be conversational and warm. No special formatting or symbols."""
        
        response = self.model.generate_content(prompt)
        return response.text
    
    def generate_chat_response(self, data: ChatRequest) -> ChatResponse:
        try:
            patient_key = f"{data.patient_data.age}_{data.patient_data.systolic_bp}_{data.patient_data.diastolic_bp}_{data.patient_data.blood_sugar}"
            
            if patient_key not in self.first_message:
                self.first_message[patient_key] = True
                response_text = self.generate_initial_response(data.patient_data, data.risk_level)
            else:
                response_text = self.answer_user_question(data.patient_data, data.risk_level, data.message)
            
            return ChatResponse(response=response_text)
        except Exception as e:
            return ChatResponse(response=f"Sorry, something went wrong: {str(e)}")


genai_service = GenAIService()