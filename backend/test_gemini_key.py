import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

key = os.getenv("GEMINI_API_KEY", "")
print("Testing API Key of length:", len(key))
print("Key starts with:", key[:8] if key else "EMPTY")

# Test with modern google-genai SDK
try:
    from google import genai
    client = genai.Client(api_key=key)
    for m in ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']:
        try:
            print(f"[*] Trying google-genai with model {m}...")
            resp = client.models.generate_content(model=m, contents='Say namaste in 3 words')
            print(f"[+] google-genai model {m} SUCCESS! Response: {resp.text.strip()}")
            break
        except Exception as ex:
            print(f"[-] Model {m} failed: {ex}")
except Exception as e:
    print("[-] google-genai error:", e)

# Test with google-generativeai SDK
try:
    import google.generativeai as gai
    gai.configure(api_key=key)
    for m in ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash']:
        try:
            print(f"[*] Trying google-generativeai with model {m}...")
            model = gai.GenerativeModel(m)
            resp2 = model.generate_content('Say namaste in 3 words')
            print(f"[+] google-generativeai model {m} SUCCESS! Response: {resp2.text.strip()}")
            break
        except Exception as ex:
            print(f"[-] gai Model {m} failed: {ex}")
except Exception as e:
    print("[-] google-generativeai error:", e)
