import json
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_endpoints():
    print("[*] Testing /api/health...")
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("    -> Health:", res.json())

    print("[*] Testing /api/poses...")
    res = client.get("/api/poses")
    assert res.status_code == 200, f"Get poses failed: {res.text}"
    poses = res.json()
    assert len(poses) == 12, f"Expected 12 poses, got {len(poses)}"
    print(f"    -> Successfully retrieved {len(poses)} poses.")

    print("[*] Testing /api/poses/tadasana...")
    res = client.get("/api/poses/tadasana")
    assert res.status_code == 200, f"Get single pose failed: {res.text}"
    pose = res.json()
    assert pose["id"] == "tadasana"
    print(f"    -> Successfully loaded {pose['sanskritName']} - {pose['englishName']}")

    print("[*] Testing /api/chat...")
    res = client.post("/api/chat", json={
        "message": "What is the importance of yoga in Indian culture?",
        "session_id": "test_session"
    })
    assert res.status_code == 200, f"Chat failed: {res.text}"
    chat_resp = res.json()
    assert "response" in chat_resp
    print("    -> Chat response received (sample):", chat_resp["response"][:100], "...")

    print("[*] Testing /api/generate-routine...")
    res = client.post("/api/generate-routine", json={
        "goal": "Relaxation",
        "experience": "Beginner",
        "duration": 15
    })
    assert res.status_code == 200, f"Routine generation failed: {res.text}"
    routine = res.json()
    assert "poses" in routine and len(routine["poses"]) > 0
    print(f"    -> Generated routine '{routine.get('title')}' with {len(routine['poses'])} poses.")

    print("[*] Testing /api/routines (Save & Retrieve)...")
    save_res = client.post("/api/routines", json={
        "title": "Evening Calming Flow",
        "goal": "Relaxation",
        "experience": "Beginner",
        "duration_minutes": 15,
        "poses": routine["poses"],
        "advice": "Breathe gently.",
        "is_favorite": True
    })
    assert save_res.status_code == 200, f"Save routine failed: {save_res.text}"
    saved = save_res.json()
    routine_id = saved["id"]
    print(f"    -> Saved routine with ID {routine_id}")

    get_routines = client.get("/api/routines")
    assert get_routines.status_code == 200
    routines_list = get_routines.json()
    assert any(r["id"] == routine_id for r in routines_list)
    print(f"    -> Verified routine in saved list (total saved: {len(routines_list)})")

    print("[*] Testing /api/sessions (Log & Retrieve Practice)...")
    sess_res = client.post("/api/sessions", json={
        "routine_id": routine_id,
        "routine_title": "Evening Calming Flow",
        "duration_minutes": 15,
        "notes": "Felt grounded and at peace."
    })
    assert sess_res.status_code == 200
    print("    -> Practice session logged.")

    sess_list = client.get("/api/sessions")
    assert sess_list.status_code == 200
    print(f"    -> Verified sessions list (total sessions: {len(sess_list.json())})")

    print("[+] ALL API ENDPOINTS PASSED WITH 100% SUCCESS!")

if __name__ == "__main__":
    test_endpoints()
