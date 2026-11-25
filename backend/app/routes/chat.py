from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import datetime
from app.database import get_db
from app.models import ChatMessage
from app.services.gemini_service import gemini_service

router = APIRouter(prefix="/api/chat", tags=["AI Yoga Assistant"])

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default"
    history: Optional[List[dict]] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    timestamp: str

class ChatMessageItem(BaseModel):
    id: int
    role: str
    content: str
    created_at: str

@router.post("", response_model=ChatResponse)
async def chat_with_assistant(req: ChatRequest, db: Session = Depends(get_db)):
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    user_text = req.message.strip()
    session_id = req.session_id or "default"

    # Save user message to database
    db_user_msg = ChatMessage(session_id=session_id, role="user", content=user_text)
    db.add(db_user_msg)
    db.commit()

    # Retrieve context from previous DB messages for this session if history wasn't sent
    history_payload = req.history
    if not history_payload:
        past_msgs = (
            db.query(ChatMessage)
            .filter(ChatMessage.session_id == session_id)
            .order_by(ChatMessage.created_at.asc())
            .limit(10)
            .all()
        )
        history_payload = [{"role": m.role, "content": m.content} for m in past_msgs]

    # Generate response via Gemini
    ai_response = await gemini_service.generate_chat_response(user_text, history_payload)

    # Save assistant response to database
    db_ai_msg = ChatMessage(session_id=session_id, role="assistant", content=ai_response)
    db.add(db_ai_msg)
    db.commit()

    return ChatResponse(
        response=ai_response,
        session_id=session_id,
        timestamp=datetime.datetime.utcnow().isoformat()
    )

@router.get("/history", response_model=List[ChatMessageItem])
def get_chat_history(session_id: str = "default", db: Session = Depends(get_db)):
    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .limit(50)
        .all()
    )
    return [
        ChatMessageItem(
            id=m.id,
            role=m.role,
            content=m.content,
            created_at=m.created_at.isoformat() if m.created_at else ""
        )
        for m in messages
    ]

@router.delete("/history")
def clear_chat_history(session_id: str = "default", db: Session = Depends(get_db)):
    db.query(ChatMessage).filter(ChatMessage.session_id == session_id).delete()
    db.commit()
    return {"message": "Chat history cleared successfully"}
