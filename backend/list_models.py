import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

key = os.getenv("GEMINI_API_KEY", "")
from google import genai

client = genai.Client(api_key=key)
print("[*] Listing available models...")
models = client.models.list()
count = 0
for m in models:
    if "flash" in m.name or "gemini" in m.name:
        print(f" - {m.name}")
        count += 1
        if count >= 10:
            break
