from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.llm_service import llm_service

router = APIRouter()

@router.post("/chat", response_model=ChatResponse, tags=["Chatbot"])
def chat(data: ChatRequest):
    return llm_service.generate_chat_response(data)