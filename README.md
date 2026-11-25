# YogaVeda AI – Discover the Wisdom of Yoga
> **Ancient Wisdom, Modern Wellness**
> An Indian Knowledge System (IKS) College Project & Interactive Wellness Platform

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4.svg?logo=google&logoColor=white)](https://ai.google.dev/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%203-003B57.svg?logo=sqlite&logoColor=white)](https://sqlite.org)

---

## 1. Project Introduction

**YogaVeda AI** is a full-stack, AI-powered web application dedicated to presenting the timeless philosophies and physical sciences of the **Indian Knowledge System (IKS)** through modern, accessible web technology.

Rather than treating Yoga merely as commercial aerobic exercise, YogaVeda AI re-anchors the practice in its authentic historical and philosophical context: Sage Patanjali's *Yoga Sutras*, the *Hatha Yoga Pradipika*, the *Gheranda Samhita*, and the *Bhagavad Gita*.

Powered by **Google Gemini AI**, the application provides:
- An educational conversational mentor (**"Ask YogaVeda"**),
- A dynamic, personalized yoga routine generator,
- A comprehensive encyclopedia of 12 foundational classical asanas,
- An interactive practice timer mode with soothing acoustic cues,
- An SQLite-backed routine and practice session tracker.

---

## 2. Problem Statement & Objectives

### Problem Statement
In contemporary global culture, Yoga is frequently stripped of its profound cultural, moral (*Yama/Niyama*), and philosophical lineage. Many practitioners are unaware of the eightfold path (*Ashtanga*), anatomical safety precautions, or the distinction between traditional spiritual teachings and modern commercial fitness trends.

### Key Objectives
1. **Preserve & Disseminate Authentic IKS Heritage**: Present verified Sanskrit names (Devanagari + IAST), scriptural references, and traditional indications.
2. **AI-Guided Education**: Leverage Google Gemini to answer questions with educational rigor, prioritizing safety precautions and cultural authenticity.
3. **Prevent Injury**: Provide step-by-step anatomical cues, beginner adaptations, and contraindications for every posture.
4. **Structured Sadhana**: Enable users to generate balanced, duration-conscious sequences tailored to relaxation, flexibility, or concentration without false medical claims.

---

## 3. Indian Knowledge System (IKS) Relevance

Yoga is one of India's six classical *Darshanas* (philosophical systems):
- **Sthira Sukham Asanam** (*Yoga Sutras 2.46*): Posture is defined by steadiness and comfort, not competitive acrobatic straining.
- **Ashtanga Yoga**: Integrating morality (*Yama*), self-discipline (*Niyama*), posture (*Asana*), breath control (*Pranayama*), sensory quietude (*Pratyahara*), concentration (*Dharana*), meditation (*Dhyana*), and unitive absorption (*Samadhi*).
- **Prana & Nadi Balance**: Harmonizing the solar (*Pingala*) and lunar (*Ida*) currents into the central spinal channel (*Sushumna*).
- **Ayurvedic Synergy**: Aligning postures with the three doshas (*Vata*, *Pitta*, *Kapha*).

---

## 4. Key Features

- **Botanical Wellness Aesthetic**: Handcrafted with nature-inspired color tones (Forest Green `#244B35`, Sage Green `#A8B99A`, Cream `#F7F5EB`, Warm Beige `#EAE6D8`, Muted Olive `#777D52`).
- **12 Verified Classical Asanas**:
  1. *Tadasana* (Mountain Pose)
  2. *Vrikshasana* (Tree Pose)
  3. *Bhujangasana* (Cobra Pose)
  4. *Trikonasana* (Triangle Pose)
  5. *Vajrasana* (Thunderbolt Pose)
  6. *Sukhasana* (Easy Pose)
  7. *Adho Mukha Svanasana* (Downward-Facing Dog)
  8. *Balasana* (Child's Pose)
  9. *Setu Bandhasana* (Bridge Pose)
  10. *Paschimottanasana* (Seated Forward Bend)
  11. *Virabhadrasana II* (Warrior Pose)
  12. *Padmasana* (Lotus Pose)
- **Ask YogaVeda AI Chatbot**: Conversational interface with message history, clear chat, and preset cultural inquiries.
- **Personalized Routine Generator**: Wizard selecting Goal, Experience, and Duration (10–30 min) generating an interactive sequence.
- **Live Practice Timer**: Built-in player with countdown clock, progress bar, audio chimes, pose visual cues, and automatic session logging.
- **My Routines & Practice Dashboard**: Save favorite sequences, review completed sessions, and view chat archives stored in SQLite.
- **Dedicated IKS Educational Page**: Interactive 8-limbs explorer, textual timelines, and scholarly references.

---

## 5. Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router DOM v7, Lucide React, Framer Motion, Axios |
| **Backend** | Python 3.10+, FastAPI, Uvicorn, SQLAlchemy, Pydantic v2 |
| **Database** | SQLite 3 (persisted locally in `backend/yogaveda.db`) |
| **AI Integration** | Google Gemini API (`google-genai` / `google-generativeai`) |
| **Assets** | Pre-generated, 100% accurate botanical SVG illustrations + Gemini Imagen generator script |

---

## 6. Architecture & System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   React.js Frontend (Vite)                  │
│  - Home Landing Page           - 12 Poses Gallery           │
│  - Ask YogaVeda AI Chat        - Routine Generator Wizard   │
│  - Interactive Practice Timer  - My Routines Dashboard      │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON API (/api)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    FastAPI Backend (Python)                 │
│  - /api/poses                  - /api/chat                  │
│  - /api/generate-routine       - /api/routines              │
│  - /api/sessions               - /api/health                │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      Google Gemini AI        │ │    SQLite 3 Database       │
│  - gemini-2.5-flash          │ │  - routines table          │
│  - Strict IKS System Prompt  │ │  - chat_messages table     │
│  - Imagen 3 (Asset Script)   │ │  - practice_sessions table │
└──────────────────────────────┘ └────────────────────────────┘
```

---

## 7. Project Folder Structure

```
yogaveda-ai/
├── frontend/
│   ├── public/
│   │   └── assets/
│   │       ├── poses/          # 12 Pose SVG illustrations
│   │       ├── hero/           # Hero landscape banner
│   │       └── illustrations/  # Lotus icons & IKS manuscript
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PoseCard.jsx
│   │   │   └── PracticeTimerModal.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ExplorePoses.jsx
│   │   │   ├── PoseDetail.jsx
│   │   │   ├── AIAssistant.jsx
│   │   │   ├── RoutineGenerator.jsx
│   │   │   ├── MyRoutines.jsx
│   │   │   └── AboutIKS.jsx
│   │   ├── data/
│   │   │   └── poses.js        # Central poses knowledge base
│   │   ├── services/
│   │   │   └── api.js          # Axios API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind CSS v4 styling
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI entry point & CORS
│   │   ├── config.py           # Environment settings
│   │   ├── database.py         # SQLAlchemy SQLite engine
│   │   ├── models.py           # Database schema
│   │   ├── routes/
│   │   │   ├── poses.py        # Poses endpoints
│   │   │   ├── chat.py         # Chat endpoints
│   │   │   └── routines.py     # Routines & session endpoints
│   │   └── services/
│   │       └── gemini_service.py # Gemini AI client & fallback
│   ├── generate_svg_assets.py  # Local vector asset generator
│   ├── generate_images.py      # Gemini Imagen script
│   ├── test_api.py             # Automated API tests
│   ├── requirements.txt
│   ├── .env.example
│   └── .env
└── README.md
```

---

## 8. Installation & Execution Guide

### Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **Python**: v3.10+
- **Google Gemini API Key** (Get free at [aistudio.google.com](https://aistudio.google.com/))

---

### Step 1: Configure Backend Environment

Navigate to the `backend/` folder and configure your `.env` file:
```bash
cd backend
cp .env.example .env
```
Open `backend/.env` and insert your Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
HOST=127.0.0.1
PORT=8000
DATABASE_URL=sqlite:///./yogaveda.db
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```
*(Note: If you do not have an API key immediately, the backend operates in an educational offline knowledge mode with zero crashes).*

---

### Step 2: Run Backend (FastAPI)

In a terminal, activate your virtual environment and start Uvicorn:

**On Windows (PowerShell):**
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**On macOS / Linux:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

The backend will start at `http://127.0.0.1:8000`.  
Interactive Swagger API documentation is available at `http://127.0.0.1:8000/docs`.

---

### Step 3: Run Frontend (React + Vite)

In a separate terminal, install dependencies (if not already done) and start the Vite development server:

```powershell
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 9. Gemini Image Generation Script

All 12 yoga poses and banners already have high-resolution, botanically styled SVG illustrations locally in `frontend/public/assets/poses/`.

If you wish to additionally generate AI photographic yoga imagery using Google's Imagen model:
1. Ensure your `GEMINI_API_KEY` is set in `backend/.env`.
2. Run the generator script:
   ```powershell
   cd backend
   python generate_images.py
   ```
The generated images will be saved directly to `frontend/public/assets/poses/`.

---

## 10. API Documentation Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend and Gemini connectivity status |
| `GET` | `/api/poses` | Retrieve all 12 yoga poses (supports category, difficulty, search filters) |
| `GET` | `/api/poses/{id}` | Detailed data for a single posture |
| `POST` | `/api/chat` | Send query to Gemini AI Yoga Assistant |
| `GET` | `/api/chat/history` | Retrieve stored chat messages |
| `DELETE` | `/api/chat/history` | Clear chat history |
| `POST` | `/api/generate-routine` | Formulate a structured yoga routine with Gemini |
| `GET` | `/api/routines` | Get all saved routines from SQLite |
| `POST` | `/api/routines` | Save a generated routine to SQLite |
| `DELETE` | `/api/routines/{id}` | Delete a saved routine |
| `PATCH` | `/api/routines/{id}/favorite` | Toggle routine favorite status |
| `POST` | `/api/sessions` | Log a completed practice session |
| `GET` | `/api/sessions` | Retrieve practice history log |

---

## 11. Testing

Automated end-to-end API tests are included in `backend/test_api.py`.  
To run the test suite:
```powershell
cd backend
venv\Scripts\python.exe test_api.py
```

Expected output:
```
[*] Testing /api/health... -> Status: healthy
[*] Testing /api/poses... -> Successfully retrieved 12 poses.
[*] Testing /api/poses/tadasana... -> Successfully loaded Tadasana.
[*] Testing /api/chat... -> Chat response received.
[*] Testing /api/generate-routine... -> Generated routine with 4 poses.
[*] Testing /api/routines... -> Verified in SQLite database.
[*] Testing /api/sessions... -> Verified practice session logged.
[+] ALL API ENDPOINTS PASSED WITH 100% SUCCESS!
```

---

## 12. Medical & Educational Disclaimer

> **Important**: YogaVeda AI is created as an academic college project on the Indian Knowledge System (IKS). The information provided is strictly educational and cultural in nature. It does not constitute medical advice, diagnosis, or clinical therapy. Individuals with cardiovascular, musculoskeletal, or ocular conditions should consult a certified healthcare professional before undertaking physical practices.
