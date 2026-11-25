import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

key = os.getenv("GEMINI_API_KEY", "")
from google import genai

client = genai.Client(api_key=key)
models_to_test = [
    "gemini-3.5-flash-lite",
    "gemini-3-flash-preview",
    "gemini-2.5-flash-lite-preview-09-2025",
    "gemini-flash-lite-latest",
    "gemini-3.8-flash"
]

for m in models_to_test:
    try:
        resp = client.models.generate_content(
            model=m,
            contents="Say namaste in 3 words"
        )
        print(f"[+] Model {m} works! Response: {resp.text.strip()}")
        break
    except Exception as e:
        print(f"[-] Model {m}: {e}")
