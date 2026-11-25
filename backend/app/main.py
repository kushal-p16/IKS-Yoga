from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routes import poses, chat, routines

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="YogaVeda AI - Backend API",
    description="Educational Indian Knowledge System (IKS) Yoga & Wellness API with Google Gemini",
    version=settings.VERSION
)

# CORS configuration
origins = settings.cors_list
if "http://localhost:5173" not in origins:
    origins.append("http://localhost:5173")
if "http://127.0.0.1:5173" not in origins:
    origins.append("http://127.0.0.1:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development flexibility
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(poses.router)
app.include_router(chat.router)
app.include_router(routines.router)

@app.get("/")
def root():
    return {
        "project": "YogaVeda AI",
        "description": "Discover the Wisdom of Yoga – Indian Knowledge System (IKS)",
        "docs": "/docs",
        "status": "online"
    }

@app.get("/api/health")
def health_check():
    gemini_status = "configured" if settings.GEMINI_API_KEY else "offline_knowledge_mode"
    return {
        "status": "healthy",
        "gemini": gemini_status,
        "model": settings.GEMINI_MODEL,
        "database": "sqlite_connected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
