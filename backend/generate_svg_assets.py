"""
YogaVeda AI - Vector Graphic Asset Generator
Generates handcrafted, high-aesthetic botanical SVG illustrations for all 12 yoga poses,
hero banner, and IKS emblems adhering strictly to the project color palette:
- Forest green: #244B35
- Deep green: #183C2A
- Sage green: #A8B99A
- Cream: #F7F5EB
- Warm beige: #EAE6D8
- Muted olive: #777D52
- Gold accent: #C5A059
"""

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent / "frontend" / "public" / "assets"
POSES_DIR = BASE_DIR / "poses"
HERO_DIR = BASE_DIR / "hero"
ILLUST_DIR = BASE_DIR / "illustrations"

POSES_DIR.mkdir(parents=True, exist_ok=True)
HERO_DIR.mkdir(parents=True, exist_ok=True)
ILLUST_DIR.mkdir(parents=True, exist_ok=True)

def generate_pose_svg(filename, title, sanskrit, pose_body_svg, accent_color="#777D52"):
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad-{filename}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7F5EB"/>
      <stop offset="50%" stop-color="#EAE6D8"/>
      <stop offset="100%" stop-color="#D9D2BE"/>
    </linearGradient>
    <linearGradient id="figure-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#244B35"/>
      <stop offset="100%" stop-color="#183C2A"/>
    </linearGradient>
    <linearGradient id="cloth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A8B99A"/>
      <stop offset="100%" stop-color="#777D52"/>
    </linearGradient>
    <radialGradient id="halo-glow" cx="50%" cy="45%" r="40%">
      <stop offset="0%" stop-color="#A8B99A" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#EAE6D8" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#183C2A" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="450" fill="url(#bg-grad-{filename})" rx="24"/>
  
  <!-- Outer Decorative Border -->
  <rect x="18" y="18" width="564" height="414" fill="none" stroke="#A8B99A" stroke-width="1.5" stroke-dasharray="6,4" rx="16" opacity="0.6"/>
  <rect x="24" y="24" width="552" height="402" fill="none" stroke="#244B35" stroke-width="0.75" rx="12" opacity="0.3"/>

  <!-- Botanical Background Leaves -->
  <g opacity="0.22" fill="#777D52">
    <!-- Left foliage -->
    <path d="M 18,220 C 50,190 70,160 85,120 C 80,150 90,190 60,230 Z"/>
    <path d="M 30,280 C 65,260 95,240 115,200 C 105,230 110,270 70,300 Z"/>
    <path d="M 20,130 C 50,110 80,100 110,70 C 95,95 100,130 65,150 Z"/>
    <!-- Right foliage -->
    <path d="M 582,220 C 550,190 530,160 515,120 C 520,150 510,190 540,230 Z"/>
    <path d="M 570,280 C 535,260 505,240 485,200 C 495,230 490,270 530,300 Z"/>
    <path d="M 580,130 C 550,110 520,100 490,70 C 505,95 500,130 535,150 Z"/>
  </g>

  <!-- Sacred Geometry / Halo -->
  <circle cx="300" cy="210" r="140" fill="url(#halo-glow)"/>
  <circle cx="300" cy="210" r="130" fill="none" stroke="#C5A059" stroke-width="1" opacity="0.35"/>
  <circle cx="300" cy="210" r="138" fill="none" stroke="#244B35" stroke-width="0.5" stroke-dasharray="3,3" opacity="0.4"/>

  <!-- Grounding Platform / Mat -->
  <ellipse cx="300" cy="375" rx="190" ry="18" fill="#A8B99A" opacity="0.3"/>
  <ellipse cx="300" cy="372" rx="170" ry="12" fill="#777D52" opacity="0.2"/>

  <!-- Specific Yoga Pose Anatomy -->
  <g filter="url(#shadow)">
    {pose_body_svg}
  </g>

  <!-- Sanskrit Calligraphy & Title Tag -->
  <g transform="translate(300, 412)" text-anchor="middle">
    <text font-family="'Cinzel', serif" font-size="13" font-weight="600" fill="#244B35" letter-spacing="3">{sanskrit.upper()} • {title.upper()}</text>
  </g>
</svg>"""
    file_path = POSES_DIR / f"{filename}.svg"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Generated {file_path}")

# --- 1. Tadasana (Mountain Pose) ---
# Standing tall, straight spine, arms down by sides with palms open, feet rooted
tadasana_body = """
  <!-- Head -->
  <circle cx="300" cy="110" r="22" fill="url(#figure-grad)"/>
  <!-- Torso -->
  <path d="M 285,135 L 315,135 L 312,240 L 288,240 Z" fill="url(#figure-grad)"/>
  <!-- Attire / Sash -->
  <path d="M 283,180 Q 300,195 317,180 L 314,240 L 286,240 Z" fill="url(#cloth-grad)" opacity="0.85"/>
  <!-- Left Arm (hangs beside torso) -->
  <path d="M 285,140 Q 268,190 268,245 L 274,245 Q 275,195 290,145 Z" fill="url(#figure-grad)"/>
  <ellipse cx="271" cy="252" rx="5" ry="8" fill="url(#figure-grad)"/>
  <!-- Right Arm (hangs beside torso) -->
  <path d="M 315,140 Q 332,190 332,245 L 326,245 Q 325,195 310,145 Z" fill="url(#figure-grad)"/>
  <ellipse cx="329" cy="252" rx="5" ry="8" fill="url(#figure-grad)"/>
  <!-- Legs (together, grounded) -->
  <path d="M 289,240 L 297,240 L 296,365 L 285,365 Z" fill="url(#figure-grad)"/>
  <path d="M 303,240 L 311,240 L 315,365 L 304,365 Z" fill="url(#figure-grad)"/>
  <!-- Feet -->
  <path d="M 282,365 L 298,365 L 298,373 L 278,373 Z" fill="url(#figure-grad)"/>
  <path d="M 302,365 L 318,365 L 322,373 L 302,373 Z" fill="url(#figure-grad)"/>
"""

# --- 2. Vrikshasana (Tree Pose) ---
# Standing balance on left leg, right foot bent high on inner left thigh, hands in prayer above head
vrikshasana_body = """
  <!-- Head -->
  <circle cx="300" cy="120" r="21" fill="url(#figure-grad)"/>
  <!-- Arms overhead in Anjali Mudra -->
  <path d="M 285,145 Q 265,110 295,65 L 305,65 Q 335,110 315,145 Z" fill="none" stroke="url(#figure-grad)" stroke-width="12" stroke-linecap="round"/>
  <!-- Joined Palms at top -->
  <path d="M 296,65 C 296,50 300,45 300,45 C 300,45 304,50 304,65 Z" fill="url(#cloth-grad)"/>
  <!-- Torso -->
  <path d="M 287,145 L 313,145 L 310,245 L 290,245 Z" fill="url(#figure-grad)"/>
  <path d="M 286,185 Q 300,198 314,185 L 311,245 L 289,245 Z" fill="url(#cloth-grad)" opacity="0.85"/>
  <!-- Standing Left Leg (rooted) -->
  <path d="M 294,245 L 306,245 L 304,366 L 293,366 Z" fill="url(#figure-grad)"/>
  <path d="M 288,366 L 308,366 L 306,374 L 284,374 Z" fill="url(#figure-grad)"/>
  <!-- Bent Right Leg (knee out to right side, sole pressed to inner knee/thigh) -->
  <path d="M 308,245 Q 365,280 345,295 L 305,270 Z" fill="url(#figure-grad)"/>
  <circle cx="355" cy="285" r="7" fill="url(#figure-grad)"/>
"""

# --- 3. Bhujangasana (Cobra Pose) ---
# Prone on belly, chest lifted high, arching back, hands grounded under shoulders
bhujangasana_body = """
  <!-- Lower body / Legs resting along mat -->
  <path d="M 170,360 Q 260,358 350,345 L 350,365 Q 260,370 170,366 Z" fill="url(#figure-grad)"/>
  <ellipse cx="165" cy="363" rx="14" ry="6" fill="url(#figure-grad)"/>
  <!-- Pelvis to Mid Torso arching upward -->
  <path d="M 340,345 Q 380,310 405,250 L 428,255 Q 395,335 345,365 Z" fill="url(#figure-grad)"/>
  <!-- Upper Chest arched high -->
  <path d="M 405,250 Q 425,190 415,160 L 438,165 Q 445,200 428,255 Z" fill="url(#figure-grad)"/>
  <!-- Head tilted gracefully looking forward/up -->
  <circle cx="430" cy="140" r="21" fill="url(#figure-grad)"/>
  <!-- Supporting Arms (grounded at floor, elbows bent slightly) -->
  <path d="M 415,185 L 435,270 L 400,362 L 385,362 L 415,268 L 405,188 Z" fill="url(#cloth-grad)"/>
  <path d="M 380,360 L 415,360 L 410,367 L 375,367 Z" fill="url(#figure-grad)"/>
"""

# --- 4. Trikonasana (Triangle Pose) ---
# Wide stance, right arm touching shin/ankle, left arm pointing straight up to sky, triangular alignment
trikonasana_body = """
  <!-- Wide standing legs forming clean triangle -->
  <path d="M 300,220 L 220,365 L 235,365 L 305,235 Z" fill="url(#figure-grad)"/>
  <path d="M 300,220 L 390,365 L 375,365 L 295,235 Z" fill="url(#figure-grad)"/>
  <!-- Feet grounded -->
  <path d="M 210,365 L 240,365 L 238,373 L 206,373 Z" fill="url(#figure-grad)"/>
  <path d="M 370,365 L 400,365 L 405,373 L 370,373 Z" fill="url(#figure-grad)"/>
  <!-- Torso lateral tilt along front leg -->
  <path d="M 298,225 L 255,160 L 273,150 L 310,220 Z" fill="url(#cloth-grad)"/>
  <!-- Head looking upward -->
  <circle cx="265" cy="130" r="20" fill="url(#figure-grad)"/>
  <!-- Lower arm reaching down to ankle -->
  <path d="M 265,165 L 235,310 L 246,312 L 275,170 Z" fill="url(#figure-grad)"/>
  <!-- Upper arm reaching straight up to sky -->
  <path d="M 270,150 L 285,60 L 297,63 L 280,155 Z" fill="url(#figure-grad)"/>
  <ellipse cx="288" cy="53" rx="6" ry="8" fill="url(#figure-grad)"/>
"""

# --- 5. Vajrasana (Thunderbolt Pose) ---
# Symmetrical kneeling posture, upright spine, hands resting on knees
vajrasana_body = """
  <!-- Head -->
  <circle cx="300" cy="140" r="22" fill="url(#figure-grad)"/>
  <!-- Torso tall and upright -->
  <path d="M 285,165 L 315,165 L 312,275 L 288,275 Z" fill="url(#figure-grad)"/>
  <path d="M 283,210 Q 300,225 317,210 L 314,275 L 286,275 Z" fill="url(#cloth-grad)" opacity="0.85"/>
  <!-- Arms resting calmly on thighs/knees -->
  <path d="M 286,170 Q 270,225 260,285 L 272,287 Q 282,230 294,175 Z" fill="url(#figure-grad)"/>
  <ellipse cx="260" cy="292" rx="7" ry="6" fill="url(#cloth-grad)"/>
  <path d="M 314,170 Q 330,225 340,285 L 328,287 Q 318,230 306,175 Z" fill="url(#figure-grad)"/>
  <ellipse cx="340" cy="292" rx="7" ry="6" fill="url(#cloth-grad)"/>
  <!-- Kneeling Thighs extending forward and Shins folded beneath -->
  <path d="M 288,270 Q 260,295 245,345 L 355,345 Q 340,295 312,270 Z" fill="url(#figure-grad)"/>
  <path d="M 240,345 Q 240,370 300,370 Q 360,370 360,345 Z" fill="url(#cloth-grad)" opacity="0.9"/>
"""

# --- 6. Sukhasana (Easy Pose) ---
# Seated cross-legged, straight spine, hands in Jnana Mudra
sukhasana_body = """
  <!-- Head -->
  <circle cx="300" cy="135" r="22" fill="url(#figure-grad)"/>
  <!-- Torso -->
  <path d="M 285,160 L 315,160 L 312,265 L 288,265 Z" fill="url(#figure-grad)"/>
  <path d="M 283,205 Q 300,220 317,205 L 314,265 L 286,265 Z" fill="url(#cloth-grad)" opacity="0.85"/>
  <!-- Cross-legged folded base -->
  <path d="M 210,340 C 210,290 280,265 300,265 C 320,265 390,290 390,340 C 390,365 210,365 210,340 Z" fill="url(#figure-grad)"/>
  <!-- Arms resting with Jnana Mudra on knees -->
  <path d="M 285,168 Q 240,220 225,300 L 237,303 Q 252,230 293,172 Z" fill="url(#figure-grad)"/>
  <circle cx="225" cy="308" r="7" fill="url(#cloth-grad)"/>
  <path d="M 315,168 Q 360,220 375,300 L 363,303 Q 348,230 307,172 Z" fill="url(#figure-grad)"/>
  <circle cx="375" cy="308" r="7" fill="url(#cloth-grad)"/>
"""

# --- 7. Adho Mukha Svanasana (Downward Dog) ---
# Clear inverted V-shape, hands grounded, feet grounded, hips apex
adho_body = """
  <!-- Inverted V Torso and Arms to ground -->
  <!-- Hands grounded at mat (left side) -->
  <ellipse cx="190" cy="365" rx="14" ry="5" fill="url(#figure-grad)"/>
  <!-- Arms reaching from hands up to shoulders at angle -->
  <path d="M 190,362 L 265,225 L 278,230 L 200,364 Z" fill="url(#figure-grad)"/>
  <!-- Head hanging relaxed between arms -->
  <circle cx="250" cy="245" r="19" fill="url(#figure-grad)"/>
  <!-- Torso rising to hips apex -->
  <path d="M 270,225 L 340,165 L 355,178 L 285,235 Z" fill="url(#cloth-grad)"/>
  <!-- Legs descending from hips to feet (right side) -->
  <path d="M 345,168 L 420,362 L 406,364 L 335,175 Z" fill="url(#figure-grad)"/>
  <!-- Feet grounded -->
  <ellipse cx="415" cy="365" rx="15" ry="5" fill="url(#figure-grad)"/>
"""

# --- 8. Balasana (Child's Pose) ---
# Kneeling, folded forward resting forehead on mat, arms extended forward
balasana_body = """
  <!-- Folded legs & hips resting on heels -->
  <ellipse cx="380" cy="335" rx="45" ry="28" fill="url(#cloth-grad)"/>
  <!-- Rounded back folding forward towards ground -->
  <path d="M 380,315 C 340,270 260,285 220,340 C 260,355 360,355 380,315 Z" fill="url(#figure-grad)"/>
  <!-- Head resting softly on mat -->
  <circle cx="205" cy="340" r="19" fill="url(#figure-grad)"/>
  <!-- Arms extended peacefully forward along floor -->
  <path d="M 230,320 L 140,355 L 142,365 L 232,335 Z" fill="url(#figure-grad)"/>
  <ellipse cx="135" cy="360" rx="8" ry="4" fill="url(#cloth-grad)"/>
"""

# --- 9. Setu Bandhasana (Bridge Pose) ---
# Supine bridge, shoulders on ground, knees bent, pelvis arched up high
setu_body = """
  <!-- Head and shoulders resting on mat (left side) -->
  <circle cx="180" cy="345" r="20" fill="url(#figure-grad)"/>
  <path d="M 175,355 L 230,355 L 230,365 L 175,365 Z" fill="url(#figure-grad)"/>
  <!-- Arms extended straight along floor beneath arch -->
  <path d="M 210,355 L 320,355 L 320,365 L 210,365 Z" fill="url(#cloth-grad)"/>
  <!-- Arching torso rising to high pelvis apex -->
  <path d="M 205,345 Q 260,265 315,225 L 335,240 Q 280,285 220,355 Z" fill="url(#figure-grad)"/>
  <!-- Thighs and knees extending toward grounded feet -->
  <path d="M 320,225 Q 365,240 395,290 L 380,300 Q 355,255 310,240 Z" fill="url(#cloth-grad)"/>
  <!-- Lower legs descending vertically to feet -->
  <path d="M 390,290 L 390,362 L 378,362 L 378,290 Z" fill="url(#figure-grad)"/>
  <!-- Feet flat on floor -->
  <ellipse cx="385" cy="365" rx="16" ry="5" fill="url(#figure-grad)"/>
"""

# --- 10. Paschimottanasana (Seated Forward Bend) ---
# Seated with legs straight forward, torso hinged from hips reaching feet
paschimo_body = """
  <!-- Legs extended flat along floor -->
  <path d="M 240,345 L 420,345 L 420,365 L 240,365 Z" fill="url(#figure-grad)"/>
  <ellipse cx="425" cy="355" rx="8" ry="14" fill="url(#figure-grad)"/>
  <!-- Hips seated at left -->
  <ellipse cx="235" cy="335" rx="28" ry="24" fill="url(#cloth-grad)"/>
  <!-- Torso hinged forward horizontally over thighs -->
  <path d="M 235,320 Q 300,265 375,295 L 370,315 Q 300,285 240,335 Z" fill="url(#figure-grad)"/>
  <!-- Head positioned softly over knees -->
  <circle cx="375" cy="285" r="19" fill="url(#figure-grad)"/>
  <!-- Arms reaching forward along legs holding feet -->
  <path d="M 270,305 L 420,342 L 418,354 L 265,315 Z" fill="url(#cloth-grad)"/>
"""

# --- 11. Virabhadrasana (Warrior II Pose) ---
# Wide deep lunge, front knee bent 90°, back leg straight, arms wide horizontal
virabhadra_body = """
  <!-- Wide lunge legs -->
  <!-- Front leg bent at 90 deg (right side) -->
  <path d="M 300,245 L 380,245 L 380,362 L 366,362 L 366,260 L 300,260 Z" fill="url(#figure-grad)"/>
  <ellipse cx="375" cy="365" rx="14" ry="5" fill="url(#figure-grad)"/>
  <!-- Back leg straight, anchored (left side) -->
  <path d="M 300,245 L 200,362 L 215,364 L 315,250 Z" fill="url(#cloth-grad)"/>
  <ellipse cx="205" cy="365" rx="14" ry="5" fill="url(#figure-grad)"/>
  <!-- Torso vertical and centered over pelvis -->
  <path d="M 290,145 L 315,145 L 312,245 L 288,245 Z" fill="url(#figure-grad)"/>
  <!-- Head turned gracefully to right gazing over front hand -->
  <circle cx="302" cy="120" r="20" fill="url(#figure-grad)"/>
  <!-- Arms extended wide parallel to floor -->
  <path d="M 180,145 L 420,145 L 420,157 L 180,157 Z" fill="url(#cloth-grad)"/>
  <ellipse cx="175" cy="151" rx="6" ry="5" fill="url(#figure-grad)"/>
  <ellipse cx="425" cy="151" rx="6" ry="5" fill="url(#figure-grad)"/>
"""

# --- 12. Padmasana (Lotus Pose) ---
# Classic lotus seat with feet resting symmetrically on opposite thighs, hands in chin mudra
padmasana_body = """
  <!-- Head with serene meditative aura -->
  <circle cx="300" cy="125" r="22" fill="url(#figure-grad)"/>
  <!-- Upright spine / Torso -->
  <path d="M 285,150 L 315,150 L 312,260 L 288,260 Z" fill="url(#figure-grad)"/>
  <path d="M 283,195 Q 300,210 317,195 L 314,260 L 286,260 Z" fill="url(#cloth-grad)" opacity="0.85"/>
  <!-- Intricately locked Lotus legs and upturned soles -->
  <path d="M 205,330 C 205,275 275,255 300,255 C 325,255 395,275 395,330 C 395,360 205,360 205,330 Z" fill="url(#figure-grad)"/>
  <!-- Upturned foot details -->
  <ellipse cx="250" cy="300" rx="16" ry="9" fill="url(#cloth-grad)" transform="rotate(-15, 250, 300)"/>
  <ellipse cx="350" cy="300" rx="16" ry="9" fill="url(#cloth-grad)" transform="rotate(15, 350, 300)"/>
  <!-- Arms in Chin Mudra resting on knees -->
  <path d="M 285,158 Q 235,215 220,295 L 232,298 Q 248,225 292,162 Z" fill="url(#figure-grad)"/>
  <circle cx="220" cy="302" r="7" fill="url(#cloth-grad)"/>
  <path d="M 315,158 Q 365,215 380,295 L 368,298 Q 352,225 308,162 Z" fill="url(#figure-grad)"/>
  <circle cx="380" cy="302" r="7" fill="url(#cloth-grad)"/>
"""

poses_data = [
    ("tadasana", "Mountain Pose", "Tāḍāsana", tadasana_body),
    ("vrikshasana", "Tree Pose", "Vṛkṣāsana", vrikshasana_body),
    ("bhujangasana", "Cobra Pose", "Bhujaṅgāsana", bhujangasana_body),
    ("trikonasana", "Triangle Pose", "Trikoṇāsana", trikonasana_body),
    ("vajrasana", "Thunderbolt Pose", "Vajrāsana", vajrasana_body),
    ("sukhasana", "Easy Pose", "Sukhāsana", sukhasana_body),
    ("adho-mukha-svanasana", "Downward-Facing Dog", "Adho Mukha Śvānāsana", adho_body),
    ("balasana", "Child's Pose", "Bālāsana", balasana_body),
    ("setu-bandhasana", "Bridge Pose", "Setu Bandhāsana", setu_body),
    ("paschimottanasana", "Seated Forward Bend", "Paścimottānāsana", paschimo_body),
    ("virabhadrasana", "Warrior Pose", "Vīrabhadrāsana II", virabhadra_body),
    ("padmasana", "Lotus Pose", "Padmāsana", padmasana_body),
]

for filename, title, sanskrit, body_svg in poses_data:
    generate_pose_svg(filename, title, sanskrit, body_svg)

# Generate Hero Banner Illustration
hero_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680" width="100%" height="100%">
  <defs>
    <linearGradient id="hero-sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EAE6D8"/>
      <stop offset="45%" stop-color="#F7F5EB"/>
      <stop offset="85%" stop-color="#D9D2BE"/>
      <stop offset="100%" stop-color="#A8B99A"/>
    </linearGradient>
    <radialGradient id="sun-glow" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stop-color="#C5A059" stop-opacity="0.45"/>
      <stop offset="50%" stop-color="#C5A059" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#F7F5EB" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tree-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#244B35"/>
      <stop offset="100%" stop-color="#183C2A"/>
    </linearGradient>
  </defs>

  <!-- Sky & Morning Mist -->
  <rect width="1200" height="680" fill="url(#hero-sky)"/>
  <circle cx="600" cy="240" r="260" fill="url(#sun-glow)"/>

  <!-- Distant Himalayan Mountains -->
  <path d="M 0,420 L 180,310 L 340,390 L 520,270 L 680,370 L 850,260 L 1040,360 L 1200,280 L 1200,680 L 0,680 Z" fill="#A8B99A" opacity="0.4"/>
  <path d="M 0,460 L 140,390 L 320,440 L 480,350 L 660,430 L 820,330 L 980,410 L 1200,360 L 1200,680 L 0,680 Z" fill="#777D52" opacity="0.35"/>

  <!-- Traditional Mandir / Ashram Pavilion Archways -->
  <g opacity="0.25" fill="#244B35">
    <rect x="220" y="320" width="16" height="180"/>
    <rect x="360" y="320" width="16" height="180"/>
    <path d="M 220,320 Q 298,240 376,320 Z"/>
    
    <rect x="824" y="320" width="16" height="180"/>
    <rect x="964" y="320" width="16" height="180"/>
    <path d="M 824,320 Q 902,240 980,320 Z"/>
  </g>

  <!-- Ground Lotus Pond and Terrace -->
  <path d="M 0,500 Q 600,470 1200,500 L 1200,680 L 0,680 Z" fill="#244B35" opacity="0.9"/>
  <ellipse cx="600" cy="580" rx="420" ry="60" fill="#183C2A"/>

  <!-- Blooming Water Lotuses -->
  <g fill="#F7F5EB" opacity="0.85">
    <path d="M 280,590 C 275,570 290,560 290,560 C 290,560 305,570 300,590 Z"/>
    <path d="M 910,585 C 905,565 920,555 920,555 C 920,555 935,565 930,585 Z"/>
  </g>

  <!-- Central Yogi in Padmasana -->
  <g transform="translate(600, 480) scale(0.9) translate(-300, -260)">
    <!-- Aura Ring -->
    <circle cx="300" cy="200" r="160" fill="none" stroke="#C5A059" stroke-width="2" opacity="0.5" stroke-dasharray="8,6"/>
    <circle cx="300" cy="200" r="175" fill="none" stroke="#F7F5EB" stroke-width="1" opacity="0.4"/>
    <!-- Head -->
    <circle cx="300" cy="115" r="26" fill="#F7F5EB"/>
    <!-- Torso -->
    <path d="M 280,145 L 320,145 L 316,270 L 284,270 Z" fill="#F7F5EB"/>
    <!-- Folded Legs -->
    <path d="M 190,345 C 190,285 270,265 300,265 C 330,265 410,285 410,345 C 410,375 190,375 190,345 Z" fill="#A8B99A"/>
    <!-- Meditative Arms -->
    <path d="M 280,155 Q 220,220 210,310 L 225,313 Q 238,230 288,160 Z" fill="#F7F5EB"/>
    <circle cx="210" cy="318" r="9" fill="#C5A059"/>
    <path d="M 320,155 Q 380,220 390,310 L 375,313 Q 362,230 312,160 Z" fill="#F7F5EB"/>
    <circle cx="390" cy="318" r="9" fill="#C5A059"/>
  </g>

  <!-- Foreground Sacred Botanical Banyan / Peepal Foliage -->
  <g fill="#183C2A" opacity="0.95">
    <path d="M 0,0 C 80,40 180,60 260,30 C 190,90 90,120 0,140 Z"/>
    <path d="M 0,140 C 120,160 220,190 280,260 C 180,250 80,230 0,280 Z"/>
    <path d="M 1200,0 C 1120,40 1020,60 940,30 C 1010,90 1110,120 1200,140 Z"/>
    <path d="M 1200,140 C 1080,160 980,190 920,260 C 1020,250 1120,230 1200,280 Z"/>
  </g>
</svg>"""

with open(HERO_DIR / "hero-yoga.svg", "w", encoding="utf-8") as f:
    f.write(hero_svg)

# Generate Brand Lotus Icon
lotus_icon = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="#244B35"/>
  <circle cx="50" cy="50" r="42" fill="none" stroke="#C5A059" stroke-width="1.5"/>
  <!-- Central Lotus Petal -->
  <path d="M 50,22 C 40,38 42,65 50,72 C 58,65 60,38 50,22 Z" fill="#F7F5EB"/>
  <!-- Left Petal -->
  <path d="M 50,72 C 32,68 22,50 28,36 C 36,48 46,62 50,72 Z" fill="#A8B99A"/>
  <!-- Right Petal -->
  <path d="M 50,72 C 68,68 78,50 72,36 C 64,48 54,62 50,72 Z" fill="#A8B99A"/>
  <!-- Floating water base -->
  <path d="M 32,76 Q 50,84 68,76 Q 50,79 32,76 Z" fill="#C5A059"/>
</svg>"""

with open(ILLUST_DIR / "lotus-icon.svg", "w", encoding="utf-8") as f:
    f.write(lotus_icon)

# Generate IKS Heritage Illustration
iks_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="iks-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#244B35"/>
      <stop offset="100%" stop-color="#183C2A"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" rx="20" fill="url(#iks-bg)"/>
  <circle cx="300" cy="200" r="140" fill="none" stroke="#C5A059" stroke-width="2" opacity="0.4"/>
  <circle cx="300" cy="200" r="160" fill="none" stroke="#A8B99A" stroke-width="1" stroke-dasharray="6,4" opacity="0.3"/>
  
  <!-- Ancient Palm-Leaf Manuscript (Talapatra) -->
  <rect x="150" y="160" width="300" height="45" rx="6" fill="#EAE6D8" opacity="0.95"/>
  <rect x="160" y="195" width="280" height="45" rx="6" fill="#F7F5EB"/>
  <!-- Cord hole -->
  <circle cx="210" cy="182" r="5" fill="#777D52"/>
  <circle cx="210" cy="217" r="5" fill="#777D52"/>
  <!-- Text lines (simulated Grantha / Devanagari script) -->
  <line x1="230" y1="178" x2="420" y2="178" stroke="#244B35" stroke-width="2" stroke-dasharray="8,4,12,3"/>
  <line x1="230" y1="187" x2="400" y2="187" stroke="#244B35" stroke-width="2" stroke-dasharray="14,3,6,4"/>
  <line x1="230" y1="213" x2="415" y2="213" stroke="#244B35" stroke-width="2" stroke-dasharray="10,4,8,3"/>
  <line x1="230" y1="222" x2="390" y2="222" stroke="#244B35" stroke-width="2" stroke-dasharray="12,3,15,4"/>

  <!-- Brass Diya / Sacred Flame -->
  <g transform="translate(300, 290)">
    <path d="M -30,10 Q 0,25 30,10 Q 0,15 -30,10 Z" fill="#C5A059"/>
    <ellipse cx="0" cy="10" rx="30" ry="6" fill="#D9D2BE"/>
    <!-- Flame -->
    <path d="M 0,8 C -10,-8 0,-35 0,-35 C 0,-35 10,-8 0,8 Z" fill="#FFA726"/>
    <path d="M 0,8 C -5,-2 0,-20 0,-20 C 0,-20 5,-2 0,8 Z" fill="#FFF59D"/>
  </g>
</svg>"""

with open(ILLUST_DIR / "iks-heritage.svg", "w", encoding="utf-8") as f:
    f.write(iks_svg)

print("All SVG assets successfully created!")
