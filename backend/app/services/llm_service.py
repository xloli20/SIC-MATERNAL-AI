from app.schemas.chat import ChatRequest, ChatResponse

class LLMService:
    @staticmethod
    def generate_chat_response(data: ChatRequest) -> ChatResponse:
        reply = (
            f"Based on your readings (BP: {data.patient_data.systolic_bp}/{data.patient_data.diastolic_bp}, "
            f"Sugar: {data.patient_data.blood_sugar}) and a '{data.risk_level}' status, "
            "your vital signs look stable. Please continue regular checkups."
        )
        return ChatResponse(response=reply)

llm_service = LLMService()