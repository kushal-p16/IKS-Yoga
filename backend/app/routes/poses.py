from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter(prefix="/api/poses", tags=["Yoga Poses"])

POSES_DATABASE = [
    {
        "id": "tadasana",
        "sanskritName": "Tadasana",
        "sanskritDevanagari": "ताड़ासन",
        "englishName": "Mountain Pose",
        "category": "Standing",
        "difficulty": "Beginner",
        "duration": "30 - 60 seconds",
        "chakra": "Muladhara (Root Chakra)",
        "dosha": "Balances Vata & Kapha",
        "image": "/assets/poses/tadasana.svg",
        "shortDescription": "The fundamental standing posture that teaches stillness, vertical alignment, and rooted stability.",
        "introduction": "Tadasana (Mountain Pose) is the foundational cornerstone of all standing yogic asanas. Derived from the Sanskrit root 'Tada' meaning mountain, this pose mirrors the unwavering majesty, rooted strength, and vertical nobility of a mountain peak.",
        "instructions": [
            "Stand with big toes touching, heels slightly apart, and weight balanced evenly across balls and heels of both feet.",
            "Lift and spread your toes, then lay them softly down onto the earth, grounding through all four corners.",
            "Engage your thigh muscles (quadriceps) and draw your kneecaps upward gently without locking knees.",
            "Tuck the tailbone slightly downward, keeping the natural gentle curvature of the spine.",
            "Broaden your collarbones, drop shoulder blades away from your ears, and let arms hang alongside the torso with palms facing forward.",
            "Lengthen the back of the neck and lift through the crown of the head, breathing softly and steadily."
        ],
        "traditionalSignificance": "Described in classic Hatha texts including the Hathapradipika and Gheranda Samhita, Tadasana embodies 'Sthirata' (steadfast stability). It teaches the practitioner that physical alignment directly mirrors mental composure and inner poise.",
        "benefits": [
            "Improves upright posture and spinal alignment",
            "Strengthens thighs, knees, ankles, and arches of the feet",
            "Firms abdomen and gluteal muscles",
            "Cultivates proprioception, bodily awareness, and mental focus",
            "Helps alleviate mild sciatica when practiced with proper pelvis leveling"
        ],
        "beginnerTips": [
            "If your balance feels unsteady, keep feet hip-width apart rather than touching.",
            "Practice standing with your back against a wall to calibrate true vertical alignment.",
            "Fix your gaze (Drishti) on an eye-level focal point straight ahead."
        ],
        "precautions": [
            "Avoid prolonged holding if experiencing acute dizziness or severe low blood pressure.",
            "Individuals with vertigo should keep eyes softly open and feet hip-distance apart."
        ],
        "relatedPoses": ["vrikshasana", "trikonasana", "virabhadrasana"]
    },
    {
        "id": "vrikshasana",
        "sanskritName": "Vrikshasana",
        "sanskritDevanagari": "वृक्षासन",
        "englishName": "Tree Pose",
        "category": "Balancing",
        "difficulty": "Beginner",
        "duration": "30 - 45 seconds each leg",
        "chakra": "Muladhara & Anahata",
        "dosha": "Balances Pitta & Vata",
        "image": "/assets/poses/vrikshasana.svg",
        "shortDescription": "A graceful one-legged balancing asana that unites grounded earth energy with skyward expansion.",
        "instructions": [
            "Begin in Tadasana, anchoring your left foot firmly into the mat.",
            "Bend the right knee, reach down, and place the right sole high onto the inner left thigh (or onto the inner calf).",
            "Ensure the right toes point directly downward and the knee gently points out to the side without distorting pelvis level.",
            "Bring your palms together at your heart center in Anjali Mudra (prayer position).",
            "Once balanced, inhale and extend arms skyward over head like branching boughs.",
            "Hold for 5 to 8 slow breaths, then gently release and repeat on the opposite side."
        ],
        "introduction": "Vrikshasana symbolizes the sacred Tree (Vriksha) in Indian cosmology—rooted deeply in the maternal soil of patience while reaching fearlessly toward celestial light.",
        "traditionalSignificance": "Featured in the Gheranda Samhita (2.36), Vrikshasana is extolled for training 'Ekagrata'—unwavering one-pointed concentration essential for higher meditation.",
        "benefits": [
            "Strengthens ankles, calves, and tendons of the foot",
            "Tones core and pelvic stabilizing musculature",
            "Enhances neuro-muscular coordination and vestibular balance",
            "Opens inner groins and chest"
        ],
        "beginnerTips": [
            "NEVER place your foot directly on the side of the knee joint; place it either well above or well below.",
            "Keep one hand against a wall or chair back if balance is still developing.",
            "Anchor your gaze at a stationary spot 4 to 6 feet on the floor ahead."
        ],
        "precautions": [
            "Avoid raising arms overhead if you have unmanaged high blood pressure; keep hands at heart center.",
            "Caution for recent ankle, knee, or hip surgeries."
        ],
        "relatedPoses": ["tadasana", "virabhadrasana", "padmasana"]
    },
    {
        "id": "bhujangasana",
        "sanskritName": "Bhujangasana",
        "sanskritDevanagari": "भुजङ्गासन",
        "englishName": "Cobra Pose",
        "category": "Prone",
        "difficulty": "Beginner",
        "duration": "15 - 30 seconds",
        "chakra": "Anahata (Heart Chakra) & Vishuddha",
        "dosha": "Balances Kapha",
        "image": "/assets/poses/bhujangasana.svg",
        "shortDescription": "A revitalizing prone backbend that awakens spinal flexibility and expands the lungs.",
        "introduction": "Bhujangasana emulates the regal poise of a rising cobra (Bhujanga). This classic backbend opens the anterior thoracic cage, stimulating vital organs and awakening spinal vitality.",
        "instructions": [
            "Lie flat on your stomach with the tops of your feet pressing firmly into the mat, hip-width apart.",
            "Place your palms flat on the floor underneath your shoulders, hugging elbows close to your torso.",
            "Press the pubic bone lightly down and activate the thighs to stabilize the lower lumbar region.",
            "On an inhale, begin lifting your chest off the mat using back muscles primarily, supporting with palms.",
            "Keep elbows slightly bent, roll the shoulders down away from the ears, and gaze gently forward.",
            "Breathe comfortably for 3-5 breaths, then exhale to lower down smoothly."
        ],
        "traditionalSignificance": "The Gheranda Samhita (2.42-43) notes that Bhujangasana awakens bodily heat (Jatharagni), kindling metabolic vigor and dispelling physical inertia.",
        "benefits": [
            "Increases spinal mobility and counters postural hunching from desk work",
            "Stretches chest, lungs, shoulders, and abdomen",
            "Tones the buttocks and lower back muscles",
            "Stimulates abdominal organs and deep respiration"
        ],
        "beginnerTips": [
            "Do not force your arms straight; keep elbows softly bent to prevent hyperextending the lower back.",
            "Lift through the sternum, not by throwing your neck backward."
        ],
        "precautions": [
            "Avoid during pregnancy, carpal tunnel flare-ups, or acute lumbar disc herniation.",
            "Practice gently if you have chronic back pain."
        ],
        "relatedPoses": ["setu-bandhasana", "adho-mukha-svanasana", "balasana"]
    },
    {
        "id": "trikonasana",
        "sanskritName": "Utthita Trikonasana",
        "sanskritDevanagari": "त्रिकोणासन",
        "englishName": "Triangle Pose",
        "category": "Standing",
        "difficulty": "Beginner",
        "duration": "30 - 45 seconds each side",
        "chakra": "Manipura (Solar Plexus) & Swadhisthana",
        "dosha": "Balances Pitta & Kapha",
        "image": "/assets/poses/trikonasana.svg",
        "shortDescription": "An expansive standing posture forming sacred geometric triangles with the limbs to awaken full-body vitality.",
        "introduction": "Trikonasana (Triangle Pose) integrates grounding, axial elongation, and lateral opening. In sacred Indian geometry (Yantra), the triangle symbolizes the interplay of creation, preservation, and dissolution.",
        "instructions": [
            "Stand with feet wide apart (around 3.5 to 4 feet). Turn right foot out 90 degrees, and angle left foot slightly inward.",
            "Inhale, extend arms horizontally at shoulder level, parallel to the ground.",
            "Exhale, reach your right torso forward over the right thigh, hinging at the right hip crease.",
            "Rest your right hand on your shin, ankle, or a yoga block, while reaching the left arm straight toward the ceiling.",
            "Rotate the torso open toward the side, keeping both sides of the waist long.",
            "Gaze up toward your top thumb if comfortable for the neck, or look straight ahead.",
            "Hold for 5 smooth breaths, inhale to rise, and repeat on the left."
        ],
        "traditionalSignificance": "Classical yoga emphasizes triangular symmetry for redistributing Prana evenly across the right and left lateral nadis (Pingala and Ida).",
        "benefits": [
            "Deeply stretches hamstrings, groins, hips, and calves",
            "Opens chest, ribcage, and shoulders, improving breathing capacity",
            "Stimulates abdominal digestion and pelvic circulation",
            "Relieves stiffness in the spine and neck"
        ],
        "beginnerTips": [
            "Avoid resting your hand directly on the knee joint to protect knee ligaments.",
            "Use a yoga block under the lower hand to keep the chest facing forward rather than collapsing toward the floor."
        ],
        "precautions": [
            "Those with neck strain should gaze forward or down toward the front foot rather than upward.",
            "Avoid deep forward twisting if experiencing acute migraine or low blood pressure."
        ],
        "relatedPoses": ["virabhadrasana", "tadasana", "paschimottanasana"]
    },
    {
        "id": "vajrasana",
        "sanskritName": "Vajrasana",
        "sanskritDevanagari": "वज्रासन",
        "englishName": "Thunderbolt Pose",
        "category": "Seated",
        "difficulty": "Beginner",
        "duration": "3 - 5 minutes",
        "chakra": "Muladhara & Manipura",
        "dosha": "Balances Vata & Kapha",
        "image": "/assets/poses/vajrasana.svg",
        "shortDescription": "A sturdy diamond/thunderbolt kneeling posture renowned for calming the mind and aiding healthy digestion.",
        "introduction": "Vajra in Sanskrit denotes both 'diamond' and the mythical lightning weapon of Indra. Vajrasana is celebrated as an extraordinarily firm, unshakeable seated posture suitable for deep contemplation.",
        "instructions": [
            "Kneel on the yoga mat with knees and big toes touching, heels flaring slightly outward.",
            "Slowly sit back onto your heels, resting your sitting bones in the hollow formed between your feet.",
            "Keep your spine naturally erect, crown lifting toward the sky, and shoulders relaxed.",
            "Rest your palms face down on your thighs or knees in a relaxed manner.",
            "Close your eyes softly and direct attention to the rhythm of natural diaphragmatic breathing."
        ],
        "traditionalSignificance": "Uniquely among traditional asanas, ancient Ayurvedic and yogic treatises (such as the Gheranda Samhita 2.12) recommend Vajrasana immediately following meals to stimulate the Vajra Nadi and kindle Jatharagni (digestive fire).",
        "benefits": [
            "Facilitates efficient digestion and helps relieve gastric heaviness",
            "Strengthens pelvic floor muscles and stabilizes lower lumbar spine",
            "Stretches ankles, insteps, and quadriceps muscles",
            "Promotes serene nervous system down-regulation"
        ],
        "beginnerTips": [
            "Place a folded blanket under ankles if tops of feet feel stiff.",
            "Place a yoga block or firm cushion between your feet to sit on if knees feel strained."
        ],
        "precautions": [
            "Avoid if suffering from severe knee ligament injuries, recent knee surgery, or severe osteoarthritis."
        ],
        "relatedPoses": ["sukhasana", "balasana", "padmasana"]
    },
    {
        "id": "sukhasana",
        "sanskritName": "Sukhasana",
        "sanskritDevanagari": "सुखासन",
        "englishName": "Easy Pose",
        "category": "Seated",
        "difficulty": "Beginner",
        "duration": "5 - 15 minutes",
        "chakra": "Muladhara & Ajna",
        "dosha": "Tridoshic (Balances Vata, Pitta & Kapha)",
        "image": "/assets/poses/sukhasana.svg",
        "shortDescription": "The classic comfortable cross-legged seated posture for meditation, breathwork, and inner centering.",
        "introduction": "Derived from 'Sukha' (ease, bliss, comfort), Sukhasana is the universally accessible gateway into seated yoga practice, pranayama, and quiet mindfulness.",
        "instructions": [
            "Sit on the mat with legs extended straight in front of you.",
            "Bend each leg at the knee and cross the shins, sliding each foot under the opposite knee.",
            "Allow feet to relax so the outer edges rest comfortably on the floor.",
            "Balance your torso evenly across both sitting bones, maintaining a gentle lift through the spine.",
            "Rest hands on knees with palms facing down (for grounding) or facing up in Jnana Mudra (index and thumb touching).",
            "Breathe slowly and rhythmically through the nose."
        ],
        "traditionalSignificance": "Fulfills Patanjali's core sutra 'Sthira Sukham Asanam' (Yoga Sutra 2.46) by fostering a state of effortless stillness in which the mental fluctuations gradually subside.",
        "benefits": [
            "Broadens the collarbones and elongates the spinal column",
            "Gently opens outer hips and stretches groins and ankles",
            "Lowers stress hormones through slow, steady diaphragmatic respiration",
            "Prepares mind and nervous system for meditation and pranayama"
        ],
        "beginnerTips": [
            "Sit on a folded blanket or meditation cushion so hips are elevated above knees, relieving lower back tension.",
            "Alternate which shin is crossed in front during different sessions to preserve hip symmetry."
        ],
        "precautions": [
            "Individuals with acute knee or hip joint inflammation should use supportive props underneath outer knees."
        ],
        "relatedPoses": ["padmasana", "vajrasana", "balasana"]
    },
    {
        "id": "adho-mukha-svanasana",
        "sanskritName": "Adho Mukha Svanasana",
        "sanskritDevanagari": "अधोमुखश्वानासन",
        "englishName": "Downward-Facing Dog",
        "category": "Inversion",
        "difficulty": "Beginner to Intermediate",
        "duration": "1 - 2 minutes",
        "chakra": "Sahasrara & Manipura",
        "dosha": "Balances Vata & Pitta",
        "image": "/assets/poses/adho-mukha-svanasana.svg",
        "shortDescription": "A transformative semi-inversion that simultaneously strengthens the upper body and decompresses the spine.",
        "introduction": "Emulating a dog stretching instinctively upon waking, Adho Mukha Svanasana is an essential transitional and restorative posture across modern and traditional yogic sequences.",
        "instructions": [
            "Begin on your hands and knees in tabletop position, wrists directly under shoulders and knees under hips.",
            "Spread fingers wide, pressing index knuckles and thumb pads firmly into the mat.",
            "Tuck your toes, exhale, and lift your knees off the floor, sending your hips up and back.",
            "Lengthen through the spine, imagining pushing the floor away with your hands.",
            "Gently work your heels down toward the floor (they do not need to touch).",
            "Keep ears aligned with upper arms and relax neck tension, taking 5 slow, deep breaths."
        ],
        "traditionalSignificance": "As a gentle partial inversion, it encourages venous return to the heart and cranial centers without the elevated intraocular pressures of full headstands.",
        "benefits": [
            "Stretches the entire posterior chain: calves, hamstrings, glutes, and dorsal spine",
            "Strengthens wrists, arms, shoulders, and core",
            "Calms the brain and helps relieve mental tiredness",
            "Improves respiratory capacity by expanding the thoracic cage"
        ],
        "beginnerTips": [
            "Prioritize a flat, long spine over straight legs! Keep knees bent if your lower back rounds.",
            "Rotate upper arms outward to create spacious freedom around the neck."
        ],
        "precautions": [
            "Avoid in late-term pregnancy or during acute episodes of carpal tunnel syndrome.",
            "Take care if you have untreated high blood pressure or detached retina."
        ],
        "relatedPoses": ["balasana", "bhujangasana", "virabhadrasana"]
    },
    {
        "id": "balasana",
        "sanskritName": "Balasana",
        "sanskritDevanagari": "बालासन",
        "englishName": "Child's Pose",
        "category": "Restorative",
        "difficulty": "Beginner",
        "duration": "1 - 3 minutes",
        "chakra": "Ajna (Third Eye Chakra)",
        "dosha": "Deeply pacifies Vata",
        "image": "/assets/poses/balasana.svg",
        "shortDescription": "A comforting sanctuary posture of surrender that releases back tension and restores inner calm.",
        "introduction": "Balasana evokes the innate vulnerability and tranquility of an infant resting safely. It serves as a vital resting haven between vigorous asanas and during moments of sensory fatigue.",
        "instructions": [
            "Kneel on the floor with big toes touching and knees comfortably wide (hip-distance or mat-width).",
            "Exhale and fold your torso forward between your thighs.",
            "Rest your forehead gently onto the mat or a folded blanket.",
            "Extend arms forward with palms facing down, or drape arms back alongside your calves with palms up.",
            "Release all tension from the shoulders, jaw, and pelvic floor. Breathe deeply into your back ribs."
        ],
        "traditionalSignificance": "Embodies the yogic virtue of *Pratyahara* (withdrawal of sensory faculties) and *Ishvara Pranidhana* (surrender of egoic effort), signaling to the autonomic nervous system that you are secure.",
        "benefits": [
            "Gently decompresses the lumbar spine and stretches hips and ankles",
            "Activates the parasympathetic 'rest-and-digest' nervous response",
            "Relieves neck and shoulder tension",
            "Alleviates mental stress and physical agitation"
        ],
        "beginnerTips": [
            "If your buttocks do not easily reach your heels, place a folded blanket between your calves and thighs.",
            "Place a block under your forehead if it does not touch the floor with ease."
        ],
        "precautions": [
            "Avoid if you have acute diarrhea or severe recent knee injury."
        ],
        "relatedPoses": ["sukhasana", "vajrasana", "adho-mukha-svanasana"]
    },
    {
        "id": "setu-bandhasana",
        "sanskritName": "Setu Bandhasana",
        "sanskritDevanagari": "सेतुबन्धासन",
        "englishName": "Bridge Pose",
        "category": "Supine",
        "difficulty": "Beginner",
        "duration": "30 - 60 seconds",
        "chakra": "Vishuddha (Throat) & Anahata",
        "dosha": "Balances Vata & Kapha",
        "image": "/assets/poses/setu-bandhasana.svg",
        "shortDescription": "A restorative heart-opening supine bridge that fortifies the posterior chain and activates deep breathing.",
        "introduction": "Setu Bandhasana (Bridge Pose) builds a living arch between earth and sky. It gently elevates the heart above the head, offering mild inversion benefits while stabilizing the spine.",
        "instructions": [
            "Lie on your back with knees bent and feet flat on the floor, hip-width apart and parallel.",
            "Place your heels close enough that your fingertips can gently graze the backs of your heels.",
            "Press your feet and upper arms firmly into the floor.",
            "On an exhale, lift your hips toward the ceiling, rolling up along the spine.",
            "Keep thighs and inner feet parallel; avoid letting knees splay outward.",
            "Optionally interlace fingers beneath your pelvis and walk shoulder heads closer together.",
            "Keep the neck relaxed and throat open. Hold for 4 to 8 steady breaths, then release down vertebra by vertebra."
        ],
        "traditionalSignificance": "Bridge posture establishes *Jalandhara Bandha* (throat lock energy seal) naturally, gently stimulating thyroid circulation and balancing metabolic rhythms.",
        "benefits": [
            "Strengthens gluteus maximus, hamstrings, and erector spinae",
            "Stretches the chest, neck, spine, and hip flexors",
            "Rejuvenates tired legs and counters prolonged sitting",
            "Soothes mild backache and mental anxiety"
        ],
        "beginnerTips": [
            "Slide a yoga block under your sacrum for a wonderfully calming, supported restorative variation.",
            "Never turn your head to the side while lifting your hips in Bridge pose."
        ],
        "precautions": [
            "Avoid full neck flexion if you have cervical disc injuries; use a folded blanket under the shoulders."
        ],
        "relatedPoses": ["bhujangasana", "paschimottanasana", "balasana"]
    },
    {
        "id": "paschimottanasana",
        "sanskritName": "Paschimottanasana",
        "sanskritDevanagari": "पश्चिमोत्तानासन",
        "englishName": "Seated Forward Bend",
        "category": "Seated",
        "difficulty": "Beginner to Intermediate",
        "duration": "1 - 3 minutes",
        "chakra": "Manipura & Swadhisthana",
        "dosha": "Pacifies Pitta & Vata",
        "image": "/assets/poses/paschimottanasana.svg",
        "shortDescription": "A quintessential classic forward fold that stretches the entire posterior energy meridian.",
        "introduction": "In yogic nomenclature, 'Paschima' refers to the west—which symbolically represents the entire dorsal back of the human body facing the rising sun. Paschimottanasana is the profound stretching of this western pathway.",
        "instructions": [
            "Sit in Dandasana (Staff Pose) with both legs extended straight out in front and spine tall.",
            "Flex your feet, pressing heels forward and drawing toes back toward your shins.",
            "Inhale, extend both arms skyward, creating space between each vertebra.",
            "Exhale, hinge forward from the hip joints rather than rounding from the mid-back.",
            "Reach for your shins, ankles, or outer edges of your feet.",
            "With every inhale, find subtle elongation through the sternum; with every exhale, release deeper into the fold.",
            "Hold for 5 to 10 conscious breaths, then gently inhale and rise back up."
        ],
        "traditionalSignificance": "Hatha Yoga Pradipika (1.28-29) accords high honor to Paschimottanasana, stating that it draws Prana into the central Sushumna channel, stimulates digestive fire, and promotes longevity.",
        "benefits": [
            "Deeply elongates hamstrings, calves, and dorsal back muscles",
            "Gently massages abdominal organs including liver, kidneys, and spleen",
            "Cools internal nervous system excitation and reduces blood pressure",
            "Encourages internal introspection and emotional groundedness"
        ],
        "beginnerTips": [
            "Loop a yoga strap around the balls of your feet and hold the ends to maintain an elongated flat spine.",
            "Bend your knees as much as needed so your abdomen rests cleanly against your thighs."
        ],
        "precautions": [
            "Avoid intense forward bending during acute sciatica flares or lumbar herniated discs."
        ],
        "relatedPoses": ["sukhasana", "balasana", "trikonasana"]
    },
    {
        "id": "virabhadrasana",
        "sanskritName": "Virabhadrasana II",
        "sanskritDevanagari": "वीरभद्रासन",
        "englishName": "Warrior II Pose",
        "category": "Standing",
        "difficulty": "Beginner",
        "duration": "30 - 60 seconds each side",
        "chakra": "Manipura & Muladhara",
        "dosha": "Balances Vata & Kapha",
        "image": "/assets/poses/virabhadrasana.svg",
        "shortDescription": "A powerful, noble standing posture embodying spiritual courage, steadfast stamina, and peaceful resolve.",
        "introduction": "Virabhadra was a mythical hero born from Lord Shiva's hair. Unlike martial combatants, the yogic warrior battles inner foes—ignorance (Avidya), egoism (Asmita), and physical complacency.",
        "instructions": [
            "Step feet wide apart (around 4 feet). Turn right foot out 90 degrees; turn left foot slightly inward (about 15 degrees).",
            "Align right heel with the arch of your left foot.",
            "Inhale and raise arms to shoulder level, parallel to the earth, palms facing downward.",
            "Exhale and bend your right knee directly over the right ankle, bringing thigh toward parallel with the mat.",
            "Keep torso centered directly over the pelvis without leaning forward.",
            "Turn head to look serenely over your right middle finger.",
            "Breathe with quiet power for 5 to 8 breaths, straighten right leg on an inhale, and reverse sides."
        ],
        "traditionalSignificance": "Cultivates 'Veerya' (spiritual vigor and determination), proving that physical intensity can coexist with deep mental calm.",
        "benefits": [
            "Strengthens and shapes thighs, calves, and ankles",
            "Stretches groins, chest, lungs, and shoulders",
            "Develops physical endurance and cardiovascular stamina",
            "Stimulates abdominal organs and core stability"
        ],
        "beginnerTips": [
            "Ensure front knee tracks directly over the second toe, preventing it from caving inward.",
            "Keep back leg straight and actively press through the outer blade of the back foot."
        ],
        "precautions": [
            "Those with recent hip or knee surgery should take a shallower lunge.",
            "Keep arms lowered or hands at hips if experiencing acute shoulder strain."
        ],
        "relatedPoses": ["tadasana", "trikonasana", "vrikshasana"]
    },
    {
        "id": "padmasana",
        "sanskritName": "Padmasana",
        "sanskritDevanagari": "पद्मासन",
        "englishName": "Lotus Pose",
        "category": "Seated",
        "difficulty": "Intermediate",
        "duration": "3 - 10 minutes",
        "chakra": "Sahasrara (Crown) & Muladhara",
        "dosha": "Tridoshic",
        "image": "/assets/poses/padmasana.svg",
        "shortDescription": "The supreme classical cross-legged seat for deep meditation, resembling the pristine lotus flower rising from murky waters.",
        "introduction": "Padmasana (Lotus Pose) is the iconic symbol of Indian spiritual philosophy. Just as the sacred lotus (Padma) blooms pristine and untouched above muddy ponds, the yogi remains serene and unattached amidst worldly currents.",
        "instructions": [
            "Sit in Dandasana with a straight spine and relaxed shoulders.",
            "Bend the right knee, cradle the right foot, and gently place the top of the right foot high onto the left upper thigh crease, sole turned upward.",
            "Carefully bend the left knee, bring the left foot over the right shin, and position it high onto the right thigh crease.",
            "Draw knees gently toward the floor, keeping the pelvis level and spine vertically elongated.",
            "Rest hands on knees in Chin Mudra or Jnana Mudra, relax facial muscles, and close eyes.",
            "Begin with Half Lotus (Ardha Padmasana) if full lotus creates any joint strain."
        ],
        "traditionalSignificance": "Hatha Yoga Pradipika (1.46-49) describes Padmasana as the destroyer of all physical illnesses and the quintessential posture for awakening Kundalini Prana through the central Sushumna nadi.",
        "benefits": [
            "Establishes a rock-solid, motionless base for prolonged meditation and pranayama",
            "Directs vital energy flow away from peripheral limbs back into the central spine",
            "Opens hips, ankles, and restores pelvic flexibility over time",
            "Soothes mental turbulence and anchors mindfulness"
        ],
        "beginnerTips": [
            "NEVER force the knees or ankles into full lotus; always start with Ardha Padmasana (Half Lotus) or Sukhasana.",
            "Ensure movement comes from deep external rotation in the hip joint, never from twisting the knee."
        ],
        "precautions": [
            "Strictly contraindicated in acute knee meniscus or cruciate ligament injuries, or severe ankle sprains."
        ],
        "relatedPoses": ["sukhasana", "vajrasana", "paschimottanasana"]
    }
]

@router.get("", response_model=List[dict])
def get_all_poses(
    category: Optional[str] = Query(None, description="Filter by category"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty"),
    search: Optional[str] = Query(None, description="Search by name or benefits")
):
    results = POSES_DATABASE
    if category and category.lower() != "all":
        results = [p for p in results if p["category"].lower() == category.lower()]
    if difficulty and difficulty.lower() != "all":
        results = [p for p in results if p["difficulty"].lower() == difficulty.lower()]
    if search:
        s = search.lower()
        results = [
            p for p in results
            if s in p["sanskritName"].lower()
            or s in p["englishName"].lower()
            or s in p["shortDescription"].lower()
            or any(s in b.lower() for b in p.get("benefits", []))
        ]
    return results

@router.get("/{pose_id}")
def get_pose_by_id(pose_id: str):
    pid = pose_id.lower().strip()
    for pose in POSES_DATABASE:
        if pose["id"].lower() == pid:
            return pose
    raise HTTPException(status_code=404, detail=f"Yoga pose '{pose_id}' not found.")
