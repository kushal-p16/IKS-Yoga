import requests
import sys

print("[*] Testing live /api/health...")
r = requests.get("http://127.0.0.1:8000/api/health")
print("Health:", r.json())

print("[*] Testing live /api/chat with Gemini API key...")
r = requests.post("http://127.0.0.1:8000/api/chat", json={
    "message": "Explain Surya Namaskar in 2 sentences."
}, timeout=30)
print("Status:", r.status_code)
# Print ascii-safe or utf-8 encoded
resp_text = r.json()["response"]
print("Response length:", len(resp_text))
print("Sample text:", resp_text.encode('ascii', errors='replace').decode('ascii')[:150])
