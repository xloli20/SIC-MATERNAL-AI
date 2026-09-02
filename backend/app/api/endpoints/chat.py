from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.genai_service import genai_service

router = APIRouter()

@router.post("/chat", response_model=ChatResponse, tags=["Chatbot"])
def chat(data: ChatRequest):
    return genai_service.generate_chat_response(data)