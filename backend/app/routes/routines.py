from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional, Any, Dict
from pydantic import BaseModel
import datetime
import json

from app.database import get_db
from app.models import Routine, PracticeSession
from app.services.gemini_service import gemini_service

router = APIRouter(prefix="/api", tags=["Routines & Sessions"])

class GenerateRoutineRequest(BaseModel):
    goal: str
    experience: str
    duration: int  # minutes: 10, 15, 20, 30

class SaveRoutineRequest(BaseModel):
    title: str
    goal: str
    experience: str
    duration_minutes: int
    poses: List[Dict[str, Any]]
    advice: Optional[str] = None
    is_favorite: Optional[bool] = False

class LogSessionRequest(BaseModel):
    routine_id: Optional[int] = None
    routine_title: str
    duration_minutes: int
    notes: Optional[str] = None

@router.post("/generate-routine")
async def generate_routine(req: GenerateRoutineRequest):
    valid_goals = ["Relaxation", "Flexibility", "General fitness", "Better concentration", "Morning wellness"]
    valid_experiences = ["Beginner", "Intermediate", "Advanced"]
    valid_durations = [10, 15, 20, 30]

    # Normalize inputs
    matched_goal = next((g for g in valid_goals if g.lower() == req.goal.lower()), "General fitness")
    matched_exp = next((e for e in valid_experiences if e.lower() == req.experience.lower()), "Beginner")
    duration = req.duration if req.duration in valid_durations else 15

    routine_data = await gemini_service.generate_routine(matched_goal, matched_exp, duration)
    return routine_data

@router.get("/routines")
def get_saved_routines(db: Session = Depends(get_db)):
    routines = db.query(Routine).order_by(Routine.created_at.desc()).all()
    results = []
    for r in routines:
        try:
            poses = json.loads(r.poses_json)
        except Exception:
            poses = []
        results.append({
            "id": r.id,
            "title": r.title,
            "goal": r.goal,
            "experience": r.experience,
            "duration_minutes": r.duration_minutes,
            "poses": poses,
            "advice": r.advice,
            "is_favorite": r.is_favorite,
            "created_at": r.created_at.isoformat() if r.created_at else ""
        })
    return results

@router.post("/routines")
def save_routine(req: SaveRoutineRequest, db: Session = Depends(get_db)):
    poses_json = json.dumps(req.poses)
    new_routine = Routine(
        title=req.title,
        goal=req.goal,
        experience=req.experience,
        duration_minutes=req.duration_minutes,
        poses_json=poses_json,
        advice=req.advice,
        is_favorite=req.is_favorite or False
    )
    db.add(new_routine)
    db.commit()
    db.refresh(new_routine)

    return {
        "id": new_routine.id,
        "title": new_routine.title,
        "goal": new_routine.goal,
        "experience": new_routine.experience,
        "duration_minutes": new_routine.duration_minutes,
        "poses": req.poses,
        "advice": new_routine.advice,
        "is_favorite": new_routine.is_favorite,
        "created_at": new_routine.created_at.isoformat()
    }

@router.delete("/routines/{routine_id}")
def delete_routine(routine_id: int, db: Session = Depends(get_db)):
    r = db.query(Routine).filter(Routine.id == routine_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Routine not found")
    db.delete(r)
    db.commit()
    return {"message": "Routine deleted successfully", "id": routine_id}

@router.patch("/routines/{routine_id}/favorite")
def toggle_favorite_routine(routine_id: int, db: Session = Depends(get_db)):
    r = db.query(Routine).filter(Routine.id == routine_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Routine not found")
    r.is_favorite = not r.is_favorite
    db.commit()
    return {"id": r.id, "is_favorite": r.is_favorite}

@router.post("/sessions")
def log_practice_session(req: LogSessionRequest, db: Session = Depends(get_db)):
    new_session = PracticeSession(
        routine_id=req.routine_id,
        routine_title=req.routine_title,
        duration_minutes=req.duration_minutes,
        notes=req.notes
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return {
        "id": new_session.id,
        "routine_title": new_session.routine_title,
        "duration_minutes": new_session.duration_minutes,
        "completed_at": new_session.completed_at.isoformat(),
        "notes": new_session.notes
    }

@router.get("/sessions")
def get_practice_sessions(db: Session = Depends(get_db)):
    sessions = db.query(PracticeSession).order_by(PracticeSession.completed_at.desc()).all()
    return [
        {
            "id": s.id,
            "routine_id": s.routine_id,
            "routine_title": s.routine_title,
            "duration_minutes": s.duration_minutes,
            "completed_at": s.completed_at.isoformat() if s.completed_at else "",
            "notes": s.notes
        }
        for s in sessions
    ]
