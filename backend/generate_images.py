"""
YogaVeda AI - Gemini Image Generation Utility
Generates authentic, botanical-themed visual assets for the 12 yoga poses and website banners
using Google Gemini's Imagen / image generation API.
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Load env from .env file
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY", "")
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "assets"
POSES_DIR = OUTPUT_DIR / "poses"
HERO_DIR = OUTPUT_DIR / "hero"
ILLUSTRATIONS_DIR = OUTPUT_DIR / "illustrations"

POSES_PROMPTS = {
    "tadasana": "A serene female yoga practitioner in Tadasana (Mountain Pose), standing tall with feet together, arms resting along sides, palms forward, grounded on a natural stone platform surrounded by soothing sacred Indian bamboo and gentle early morning sunlight, botanical green and cream aesthetic, elegant realistic photography style, no watermark, no text.",
    "vrikshasana": "A serene yoga practitioner in perfect Vrikshasana (Tree Pose), standing balance on one leg with the other foot against inner thigh, hands joined in Anjali Mudra prayer at the chest, calm botanical forest background with morning mist and lush peepal leaves, soft warm light, clean composition, no text, no watermark.",
    "bhujangasana": "A peaceful yoga practitioner in Bhujangasana (Cobra Pose), lying prone with upper chest gracefully lifted, palms on ground under shoulders, elbows soft, surrounded by lush potted medicinal herbs and calm natural earth tones, warm ambient lighting, high quality yoga photography, no text.",
    "trikonasana": "A focused yoga practitioner demonstrating Utthita Trikonasana (Triangle Pose), legs wide, right arm reaching down to shin, left arm extended straight up to the sky, open chest, serene botanical courtyard setting with terracotta tiles and green foliage, crisp natural lighting, no text.",
    "vajrasana": "A calm meditative yoga practitioner in Vajrasana (Thunderbolt Pose), kneeling symmetrically upright with feet folded beneath hips, hands resting peacefully on knees, tranquil Indian wellness ashram veranda with morning sunlight, warm beige and sage green tones, no text.",
    "sukhasana": "A serene practitioner seated in Sukhasana (Easy Pose), cross-legged on a woven natural jute mat, spine tall, hands in Jnana Mudra, soft sunlight filtering through eucalyptus trees, serene wellness sanctuary, premium editorial style, no text.",
    "adho-mukha-svanasana": "An athletic yoga practitioner executing Adho Mukha Svanasana (Downward-Facing Dog Pose), clear inverted V-shape alignment, spine lengthened, palms pressing into mat, peaceful stone terrace bordered by lush Ayurvedic plants, golden hour lighting, no text.",
    "balasana": "A resting practitioner in Balasana (Child's Pose), forehead resting softly on a mat, torso folded over thighs with arms extended forward, deep relaxation ambiance with gentle diffused sunlight and monstera leaves, restorative mood, no text.",
    "setu-bandhasana": "A practitioner in Setu Bandhasana (Bridge Pose), supine with hips lifted into an arch, feet grounded flat, shoulders relaxed, surrounded by peaceful indoor botanical garden with terracotta pots and bamboo, soft morning glow, no text.",
    "paschimottanasana": "A calm yoga practitioner in Paschimottanasana (Seated Forward Bend), seated with legs extended forward, hinging from hips with hands holding feet, calm minimalist wood and botanical sanctuary, gentle soft lighting, no text.",
    "virabhadrasana": "A strong, graceful yoga practitioner in Virabhadrasana II (Warrior 2 Pose), deep lunge with arms extended parallel to floor, gaze focused over front fingertips, beautiful courtyard surrounded by banyan trees, empowering and serene ambiance, no text.",
    "padmasana": "A peaceful yoga practitioner in full Padmasana (Lotus Pose), legs crossed with feet resting on opposite thighs, hands in chin mudra, pristine lotus pond in background with soft morning mist, spiritual and grounded traditional Indian aesthetic, no text."
}

BANNER_PROMPTS = {
    "hero_banner": "A panoramic peaceful view of a traditional Indian yoga meditation pavilion at dawn, ancient sandstone architecture, lotus pond, banyan tree, warm sunbeams, sage green, forest green and warm cream palette, ultra-high resolution photography, serene wellness atmosphere, no text.",
    "iks_heritage": "An artistic tribute to ancient Indian knowledge systems and yoga history, ancient Sanskrit manuscripts on palm leaves, brass oil lamp (diya), sacred rudraksha, Himalayan mountain backdrop, warm golden and deep forest tones, no text."
}

def generate_with_gemini():
    if not API_KEY:
        print("[!] GEMINI_API_KEY is not set in backend/.env.")
        print("Please set GEMINI_API_KEY in backend/.env to run image generation.")
        return False

    try:
        from google import genai
        from google.genai import types
        client = genai.Client(api_key=API_KEY)
        print("[+] Initialized Google GenAI Client.")

        POSES_DIR.mkdir(parents=True, exist_ok=True)
        HERO_DIR.mkdir(parents=True, exist_ok=True)
        ILLUSTRATIONS_DIR.mkdir(parents=True, exist_ok=True)

        for pose_id, prompt in POSES_PROMPTS.items():
            print(f"[*] Generating image for {pose_id}...")
            try:
                result = client.models.generate_images(
                    model="imagen-3.0-generate-002",
                    prompt=prompt,
                    config=dict(
                        number_of_images=1,
                        output_mime_type="image/jpeg",
                        aspect_ratio="4:3"
                    )
                )
                if result.generated_images:
                    img_bytes = result.generated_images[0].image.image_bytes
                    file_path = POSES_DIR / f"{pose_id}.jpg"
                    with open(file_path, "wb") as f:
                        f.write(img_bytes)
                    print(f"    -> Saved {file_path}")
            except Exception as e:
                print(f"    [!] Error generating {pose_id}: {e}")

        print("[+] Finished image generation run.")
        return True
    except Exception as e:
        print(f"[!] Error during Gemini image generation: {e}")
        return False

if __name__ == "__main__":
    generate_with_gemini()
