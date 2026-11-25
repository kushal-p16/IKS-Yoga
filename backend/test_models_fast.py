import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

key = os.getenv("GEMINI_API_KEY", "")
from google import genai

client = genai.Client(api_key=key)
for model_name in ['gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-2.5-flash-lite', 'gemini-3.8-flash']:
    try:
        print(f"Testing {model_name}...")
        resp = client.models.generate_content(
            model=model_name,
            contents="Namaste! Give a 1-sentence blessing for a yoga student."
        )
        print(f"[+] SUCCESS with {model_name}: {resp.text.strip()}\n")
        break
    except Exception as e:
        print(f"[-] {model_name} failed: {e}\n")
