import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from app.database import Base

class Routine(Base):
    __tablename__ = "routines"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    goal = Column(String(100), nullable=False)
    experience = Column(String(50), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    poses_json = Column(Text, nullable=False)  # JSON-encoded array of poses
    advice = Column(Text, nullable=True)
    is_favorite = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), default="default", index=True)
    role = Column(String(20), nullable=False)  # "user" or "assistant"
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class PracticeSession(Base):
    __tablename__ = "practice_sessions"

    id = Column(Integer, primary_key=True, index=True)
    routine_id = Column(Integer, nullable=True)
    routine_title = Column(String(255), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    completed_at = Column(DateTime, default=datetime.datetime.utcnow)
    notes = Column(Text, nullable=True)
