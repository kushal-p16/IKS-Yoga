import json
import logging
import os
from typing import List, Dict, Any, Optional
from app.config import settings

logger = logging.getLogger(__name__)

SYSTEM_INSTRUCTION = (
    "You are YogaVeda AI, an educational assistant specializing in traditional Indian yoga and "
    "wellness knowledge. Explain yoga concepts in simple language. Prioritize historically grounded "
    "Indian knowledge (Patanjali Yoga Sutras, Hatha Yoga Pradipika, Gheranda Samhita, Bhagavad Gita). "
    "Clearly distinguish traditional beliefs from established scientific evidence. "
    "Never diagnose diseases, prescribe treatment or promise cures. Always provide relevant safety "
    "precautions for physical practices."
)

KNOWN_POSES = {
    "tadasana": {
        "id": "tadasana",
        "sanskritName": "Tadasana (ताड़ासन)",
        "englishName": "Mountain Pose",
        "image": "/assets/poses/tadasana.svg",
    },
    "vrikshasana": {
        "id": "vrikshasana",
        "sanskritName": "Vrikshasana (वृक्षासन)",
        "englishName": "Tree Pose",
        "image": "/assets/poses/vrikshasana.svg",
    },
    "bhujangasana": {
        "id": "bhujangasana",
        "sanskritName": "Bhujangasana (भुजङ्गासन)",
        "englishName": "Cobra Pose",
        "image": "/assets/poses/bhujangasana.svg",
    },
    "trikonasana": {
        "id": "trikonasana",
        "sanskritName": "Trikonasana (त्रिकोणासन)",
        "englishName": "Triangle Pose",
        "image": "/assets/poses/trikonasana.svg",
    },
    "vajrasana": {
        "id": "vajrasana",
        "sanskritName": "Vajrasana (वज्रासन)",
        "englishName": "Thunderbolt Pose",
        "image": "/assets/poses/vajrasana.svg",
    },
    "sukhasana": {
        "id": "sukhasana",
        "sanskritName": "Sukhasana (सुखासन)",
        "englishName": "Easy Pose",
        "image": "/assets/poses/sukhasana.svg",
    },
    "adho-mukha-svanasana": {
        "id": "adho-mukha-svanasana",
        "sanskritName": "Adho Mukha Svanasana (अधोमुखश्वानासन)",
        "englishName": "Downward-Facing Dog",
        "image": "/assets/poses/adho-mukha-svanasana.svg",
    },
    "balasana": {
        "id": "balasana",
        "sanskritName": "Balasana (बालासन)",
        "englishName": "Child's Pose",
        "image": "/assets/poses/balasana.svg",
    },
    "setu-bandhasana": {
        "id": "setu-bandhasana",
        "sanskritName": "Setu Bandhasana (सेतुबन्धासन)",
        "englishName": "Bridge Pose",
        "image": "/assets/poses/setu-bandhasana.svg",
    },
    "paschimottanasana": {
        "id": "paschimottanasana",
        "sanskritName": "Paschimottanasana (पश्चिमोत्तानासन)",
        "englishName": "Seated Forward Bend",
        "image": "/assets/poses/paschimottanasana.svg",
    },
    "virabhadrasana": {
        "id": "virabhadrasana",
        "sanskritName": "Virabhadrasana (वीरभद्रासन)",
        "englishName": "Warrior Pose",
        "image": "/assets/poses/virabhadrasana.svg",
    },
    "padmasana": {
        "id": "padmasana",
        "sanskritName": "Padmasana (पद्मासन)",
        "englishName": "Lotus Pose",
        "image": "/assets/poses/padmasana.svg",
    }
}

class GeminiService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")
        self.primary_model = settings.GEMINI_MODEL or "gemini-3.5-flash-lite"
        self.client = None
        self._init_client()

    def _init_client(self):
        if self.api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
                logger.info(f"Google GenAI client initialized with model: {self.primary_model}")
            except Exception as e:
                logger.warning(f"Could not initialize Google GenAI client: {e}")
                self.client = None

    async def generate_chat_response(self, message: str, history: Optional[List[Dict[str, str]]] = None) -> str:
        if self.client and self.api_key:
            prompt_text = f"{SYSTEM_INSTRUCTION}\n\nUser Question: {message}"
            if history:
                context_str = "\n".join([f"{h.get('role', 'user')}: {h.get('content', '')}" for h in history[-4:]])
                prompt_text = f"{SYSTEM_INSTRUCTION}\n\nPrevious Conversation:\n{context_str}\n\nUser Question: {message}"

            try:
                resp = self.client.models.generate_content(
                    model=self.primary_model,
                    contents=prompt_text
                )
                if resp and resp.text:
                    return resp.text.strip()
            except Exception as e:
                logger.warning(f"Primary model {self.primary_model} call error: {e}")

        return self._fallback_chat_response(message)

    async def generate_routine(self, goal: str, experience: str, duration: int) -> Dict[str, Any]:
        if self.client and self.api_key:
            prompt = (
                f"{SYSTEM_INSTRUCTION}\n\n"
                f"Create a balanced traditional Indian Yoga routine for:\n"
                f"- Goal: {goal}\n"
                f"- Experience Level: {experience}\n"
                f"- Available Duration: {duration} minutes\n\n"
                f"Select suitable poses from this specific list: Tadasana, Vrikshasana, Bhujangasana, Trikonasana, "
                f"Vajrasana, Sukhasana, Adho Mukha Svanasana, Balasana, Setu Bandhasana, Paschimottanasana, "
                f"Virabhadrasana, Padmasana.\n\n"
                f"Respond ONLY with valid JSON with this exact structure:\n"
                f"{{\n"
                f'  "title": "Title of the routine",\n'
                f'  "overview": "Short introductory description based on traditional wellness",\n'
                f'  "advice": "Traditional advice, breath awareness (pranayama), and mindset",\n'
                f'  "poses": [\n'
                f'    {{\n'
                f'      "pose_id": "one of: tadasana, vrikshasana, bhujangasana, trikonasana, vajrasana, sukhasana, adho-mukha-svanasana, balasana, setu-bandhasana, paschimottanasana, virabhadrasana, padmasana",\n'
                f'      "name": "Pose Sanskrit & English Name",\n'
                f'      "duration_seconds": 60,\n'
                f'      "instructions": "Clear, gentle step-by-step guidance",\n'
                f'      "rest_time_seconds": 15,\n'
                f'      "safety_tips": "Contraindications and beginner modifications"\n'
                f'    }}\n'
                f'  ]\n'
                f"}}"
            )

            try:
                resp = self.client.models.generate_content(
                    model=self.primary_model,
                    contents=prompt
                )
                if resp and resp.text:
                    clean_text = resp.text.strip()
                    if clean_text.startswith("```json"):
                        clean_text = clean_text[7:]
                    if clean_text.startswith("```"):
                        clean_text = clean_text[3:]
                    if clean_text.endswith("```"):
                        clean_text = clean_text[:-3]
                    parsed = json.loads(clean_text.strip())

                    for item in parsed.get("poses", []):
                        pid = item.get("pose_id", "").lower().replace(" ", "-").replace("_", "-")
                        matched = KNOWN_POSES.get(pid, KNOWN_POSES["sukhasana"])
                        item["pose_id"] = matched["id"]
                        item["image"] = matched["image"]
                        if not item.get("name"):
                            item["name"] = f"{matched['sanskritName']} - {matched['englishName']}"
                    return parsed
            except Exception as e:
                logger.warning(f"Routine generation error with {self.primary_model}: {e}")

        return self._fallback_routine(goal, experience, duration)

    def _fallback_chat_response(self, message: str) -> str:
        lower = message.lower()
        if "surya namaskar" in lower or "sun salutation" in lower:
            return (
                "**Surya Namaskar (सूर्य नमस्कार - Sun Salutation)** is a profound, sequential series of 12 postures "
                "honoring the Sun as the source of vitality and cosmic energy in the Vedic tradition.\n\n"
                "### Traditional Significance:\n"
                "Recorded in ancient texts and popularized as an invigorating morning practice, Surya Namaskar harmonizes "
                "breath (*Prana*), physical movements (*Asana*), and solar solar energy (*Surya Nadi*). Each step is traditionally "
                "accompanied by a dedicated solar mantra (such as *Om Mitraya Namaha*, *Om Ravaye Namaha*).\n\n"
                "### Key Flow Steps:\n"
                "1. **Pranamasana (Prayer Pose)**: Centering and breath awareness.\n"
                "2. **Hasta Uttanasana (Raised Arms Pose)**: Inhaling and expanding the chest.\n"
                "3. **Padahastasana (Standing Forward Bend)**: Exhaling, grounding down.\n"
                "4. **Ashwa Sanchalanasana (Equestrian Pose)**: Awakening the spine and hip flexors.\n"
                "5. **Dandasana (Plank)** & **Ashtanga Namaskara (Salute with 8 limbs)**: Building core discipline.\n"
                "6. **Bhujangasana (Cobra)** & **Adho Mukha Svanasana (Downward Dog)**: Spinal flexibility.\n\n"
                "### Traditional Safety Advice:\n"
                "Practice slowly with empty stomach in the early morning facing East. Avoid jerky movements, and those with "
                "severe cardiac or spinal issues should practice gentle modifications."
            )
        elif "eight limbs" in lower or "ashtanga" in lower or "patanjali" in lower:
            return (
                "### Patanjali's Ashtanga Yoga (The Eight Limbs of Classical Yoga)\n\n"
                "In the *Yoga Sutras* (circa 400 CE), Sage Patanjali outlines the comprehensive eightfold path (*Ashtanga*) "
                "for achieving clarity of consciousness (*Chitta Vritti Nirodha*):\n\n"
                "1. **Yama (Restraints / Universal Morality)**: Ahimsa (non-violence), Satya (truthfulness), "
                "Asteya (non-stealing), Brahmacharya (energy containment), and Aparigraha (non-possessiveness).\n"
                "2. **Niyama (Personal Observances)**: Shaucha (purity), Santosha (contentment), Tapas (disciplined effort), "
                "Svadhyaya (self-study of sacred texts), and Ishvara Pranidhana (surrender to universal consciousness).\n"
                "3. **Asana (Posture)**: Defined by Patanjali as *'Sthira Sukham Asanam'*—a posture that is steady and comfortable.\n"
                "4. **Pranayama (Breath Control)**: Conscious regulation and expansion of the vital life-force.\n"
                "5. **Pratyahara (Sensory Withdrawal)**: Drawing the senses inward from external distractions.\n"
                "6. **Dharana (Focused Concentration)**: Fixing the mind on a single object or point.\n"
                "7. **Dhyana (Sustained Meditation)**: Unbroken flow of awareness towards the contemplation object.\n"
                "8. **Samadhi (Absorbed Transcendence)**: The state of unitive oneness and spiritual liberation."
            )
        else:
            return (
                f"Namaste! In the Indian Knowledge System (IKS), Yoga is far more than physical exercise—it is a comprehensive "
                f"*Darshana* (philosophical worldview) aimed at integrating the body, breath, intellect, and inner consciousness.\n\n"
                "### Core Classical Pillars:\n"
                "- **Sthira & Sukha**: Firmness without tension, ease without collapse (*Yoga Sutra 2.46*).\n"
                "- **Prana as the Vital Bridge**: Linking somatic movement with autonomic nervous regulation.\n"
                "- **Ahimsa (Non-harming)**: Honoring the natural bio-mechanical limits of the body."
            )

    def _fallback_routine(self, goal: str, experience: str, duration: int) -> Dict[str, Any]:
        routines_catalog = {
            "Relaxation": [
                {"pid": "sukhasana", "dur": 120, "rest": 15, "inst": "Sit upright with relaxed shoulders. Focus gently on natural inhalation and exhalation.", "safety": "Sit on a folded blanket if hips feel tight."},
                {"pid": "balasana", "dur": 180, "rest": 20, "inst": "Kneel, fold forward, resting forehead softly on the mat while extending arms comfortably.", "safety": "Place a cushion between thighs and calves if knees feel tension."},
                {"pid": "setu-bandhasana", "dur": 120, "rest": 20, "inst": "Lie supine, bend knees, gently lift hips, opening the heart space while breathing deeply.", "safety": "Keep neck neutral; do not turn head while in bridge pose."},
                {"pid": "vajrasana", "dur": 180, "rest": 15, "inst": "Sit back comfortably onto heels with an elongated spine. Promotes digestive calmness.", "safety": "Avoid if dealing with acute knee inflammation."}
            ],
            "Flexibility": [
                {"pid": "tadasana", "dur": 60, "rest": 15, "inst": "Stand tall, feet grounded, crown of head rising upward. Align posture and engage core.", "safety": "Distribute weight evenly across all four corners of both feet."},
                {"pid": "trikonasana", "dur": 90, "rest": 15, "inst": "Step feet wide, extend torso laterally over front leg, reaching skyward with top arm.", "safety": "Do not collapse lower ribs; rest hand on shin or block rather than knee."},
                {"pid": "adho-mukha-svanasana", "dur": 120, "rest": 20, "inst": "Form an inverted V-shape, pressing palms firmly, lengthening hamstrings and spine.", "safety": "Bend knees slightly if hamstrings or lower back feel tight."},
                {"pid": "bhujangasana", "dur": 90, "rest": 20, "inst": "Lie prone, gently press hands to lift chest, rolling shoulders back and down.", "safety": "Engage lower back gently; do not crunch cervical spine."},
                {"pid": "paschimottanasana", "dur": 120, "rest": 15, "inst": "Sit with legs extended, hinge from the hips to gently reach forward.", "safety": "Keep spine long; do not forcefully round shoulders."}
            ],
            "General fitness": [
                {"pid": "tadasana", "dur": 60, "rest": 10, "inst": "Establish mindful presence, activate quad muscles, lift through crown of head.", "safety": "Maintain soft knees, avoid hyper-extension."},
                {"pid": "virabhadrasana", "dur": 90, "rest": 20, "inst": "Lunge deeply into front knee, extend arms parallel to floor, gaze strong over front fingertips.", "safety": "Ensure front knee tracks directly over ankle, not past toes."},
                {"pid": "adho-mukha-svanasana", "dur": 90, "rest": 15, "inst": "Anchor through fingers and knuckles, lengthen tailbone toward ceiling.", "safety": "Distribute weight evenly between hands and feet."},
                {"pid": "setu-bandhasana", "dur": 90, "rest": 15, "inst": "Lift pelvis using glutes and hamstrings, interlace fingers beneath back if comfortable.", "safety": "Avoid turning neck sideways."},
                {"pid": "balasana", "dur": 90, "rest": 10, "inst": "Surrender weight to gravity in Child's Pose, regulating heart rate.", "safety": "Breathe into back ribs."}
            ],
            "Better concentration": [
                {"pid": "sukhasana", "dur": 90, "rest": 15, "inst": "Adopt a grounded seated posture, spine erect, hands resting in Jnana Mudra.", "safety": "Keep chin parallel to floor."},
                {"pid": "vrikshasana", "dur": 90, "rest": 15, "inst": "Ground through standing foot, bring opposite foot to inner thigh, fix gaze (Drishti).", "safety": "Place foot on calf or touch toe to floor if balance wavers."},
                {"pid": "virabhadrasana", "dur": 90, "rest": 15, "inst": "Channel the warrior's serene focus. Calm breath while sustaining the posture.", "safety": "Relax shoulders away from ears."},
                {"pid": "padmasana", "dur": 120, "rest": 20, "inst": "Cross legs in classic lotus or half-lotus posture, meditating on breath rhythm.", "safety": "Switch to Sukhasana if any strain is felt in knee ligaments."}
            ],
            "Morning wellness": [
                {"pid": "tadasana", "dur": 60, "rest": 10, "inst": "Greet the morning sun with tall mountain alignment and full diaphragmatic breaths.", "safety": "Relax facial muscles and jaw."},
                {"pid": "trikonasana", "dur": 90, "rest": 15, "inst": "Stretch lateral side-body and awaken lungs, stimulating vitality.", "safety": "Keep spine aligned along leg plane."},
                {"pid": "bhujangasana", "dur": 90, "rest": 15, "inst": "Gently arch upper back, opening chest and respiratory passages.", "safety": "Keep elbows slightly bent and close to ribs."},
                {"pid": "vajrasana", "dur": 120, "rest": 10, "inst": "Settle into kneeling posture to awaken digestion and balance morning energy.", "safety": "Place small towel under insteps if ankles feel stiff."}
            ]
        }

        chosen_key = goal if goal in routines_catalog else "General fitness"
        template_poses = routines_catalog[chosen_key]

        poses_output = []
        for p in template_poses:
            pose_meta = KNOWN_POSES.get(p["pid"], KNOWN_POSES["sukhasana"])
            poses_output.append({
                "pose_id": pose_meta["id"],
                "name": f"{pose_meta['sanskritName']} - {pose_meta['englishName']}",
                "image": pose_meta["image"],
                "duration_seconds": p["dur"],
                "instructions": p["inst"],
                "rest_time_seconds": p["rest"],
                "safety_tips": p["safety"]
            })

        return {
            "title": f"Traditional {goal} Sadhana ({duration} min)",
            "overview": (
                f"A harmonious {duration}-minute sequence formulated for {experience.lower()} practitioners "
                f"seeking {goal.lower()}."
            ),
            "advice": "Maintain steady, nasal breathing throughout. Honor Patanjali's guideline: 'Sthira Sukham Asanam'.",
            "poses": poses_output
        }

gemini_service = GeminiService()
