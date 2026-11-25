import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

key = os.getenv("GEMINI_API_KEY", "")
from google import genai

client = genai.Client(api_key=key)
resp = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Namaste, explain Yoga in one short sentence."
)
print("SUCCESSFUL GEMINI RESPONSE:")
print(resp.text)
