"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider, InfoCard } from "@/components/ui";
import Link from "next/link";

// ─── FULL CARD DATA WITH DEEP TEACHINGS ────────────────────
interface CardLesson {
  name: string;
  numeral: string;
  symbol: string;
  keywords: string[];
  reversedKeywords: string[];
  archetype: string;
  journey: string;
  symbolism: string[];
  uprightDeep: string;
  reversedDeep: string;
  reflections: string[];
  inLife: string;
}

const LESSONS: CardLesson[] = [
  {
    name: "The Fool", numeral: "0", symbol: "🃏",
    keywords: ["Beginnings", "Innocence", "Leap of faith", "Freedom"],
    reversedKeywords: ["Recklessness", "Fear of change", "Naivety"],
    archetype: "The Eternal Beginner",
    journey: "The Fool is card zero — not the start of the journey but the space before it. They stand at the edge of a cliff with nothing but a small bag and absolute trust. This is you before every major life transition: the moment before you quit the job, leave the relationship, move to a new country, or say the thing you've been holding back.",
    symbolism: [
      "The cliff edge — the threshold between the known and unknown",
      "The white rose — purity of intention, not yet touched by experience",
      "The small bag — you carry less than you think you need",
      "The dog — your instincts, either warning you or urging you forward",
      "Looking up, not down — faith overrides fear",
    ],
    uprightDeep: "You are being called to begin something without guarantees. The Fool doesn't ask 'will this work?' — they ask 'what am I if I never try?' This card gives you permission to not have it figured out. The leap itself is the teaching.",
    reversedDeep: "You may be holding back from a necessary change out of fear, or rushing into something without listening to your instincts. Are you being cautious or are you being a prisoner of your own safety? There's a difference.",
    reflections: [
      "Where in your life are you standing at a cliff's edge?",
      "What would you begin if you weren't afraid of looking foolish?",
      "Are you over-planning to avoid the vulnerability of not knowing?",
    ],
    inLife: "Drawing The Fool suggests a new cycle is available to you. Something wants to begin. You don't need to see the whole path — just the next step.",
  },
  {
    name: "The Magician", numeral: "I", symbol: "✧",
    keywords: ["Manifestation", "Willpower", "Resourcefulness", "Skill"],
    reversedKeywords: ["Manipulation", "Untapped potential", "Deception"],
    archetype: "The Conscious Creator",
    journey: "After the leap of The Fool, The Magician discovers they have tools. One hand points to heaven, the other to earth — 'as above, so below.' This is the moment you realize you have agency. You are not a passive observer. You can shape reality through focused intention and action.",
    symbolism: [
      "The four suit symbols on the table — you have all the elements (will, emotion, intellect, material) available",
      "The infinity symbol (∞) above the head — infinite potential, mastery over cycles",
      "One hand up, one hand down — channeling higher wisdom into earthly action",
      "The red and white robes — passion tempered by purity of purpose",
    ],
    uprightDeep: "You have everything you need right now. Not tomorrow, not after the course, not when you feel ready — now. The Magician's power is not about acquiring more but about using what is already on your table. Focus your energy. Stop scattering.",
    reversedDeep: "You may be using your gifts to manipulate rather than create, or you may be paralyzed by the gap between your potential and your output. Are you performing magic or performing for an audience?",
    reflections: [
      "What skills and resources do you already have that you're not using?",
      "Where are you waiting for permission instead of acting?",
      "Are you directing your energy toward what truly matters, or dispersing it?",
    ],
    inLife: "This card says: stop waiting, start creating. Your intention has power. But power without integrity is just manipulation.",
  },
  {
    name: "The High Priestess", numeral: "II", symbol: "☽",
    keywords: ["Intuition", "Mystery", "Subconscious", "Inner knowing"],
    reversedKeywords: ["Ignoring intuition", "Secrets", "Disconnection"],
    archetype: "The Inner Voice",
    journey: "The High Priestess sits between two pillars — one black (mystery), one white (revelation). She holds a scroll of hidden knowledge but does not show it. After The Magician's active doing, she teaches the power of receptivity. Not everything is meant to be figured out. Some things are meant to be felt.",
    symbolism: [
      "The two pillars (B and J) — duality, the threshold between conscious and unconscious",
      "The crescent moon at her feet — connection to cycles, emotion, the feminine",
      "The pomegranate veil — hidden knowledge, the fruit of the underworld",
      "The Torah/scroll — sacred wisdom that reveals itself in layers",
      "The water behind the veil — the vast subconscious mind",
    ],
    uprightDeep: "You know more than you think you know. The answer you're looking for isn't in another book or another person's opinion — it's in the quiet voice beneath your thoughts. The High Priestess asks you to stop Googling and start listening.",
    reversedDeep: "You may be overriding your gut feeling with logic, or keeping secrets that are creating internal pressure. What are you refusing to know?",
    reflections: [
      "What is your body telling you that your mind is overriding?",
      "When was the last time you sat in silence long enough to hear yourself?",
      "What do you already know about this situation that you're pretending not to?",
    ],
    inLife: "Slow down. The timing isn't right for action — it's right for listening. Trust what surfaces in dreams, quiet moments, and the space between thoughts.",
  },
  {
    name: "The Empress", numeral: "III", symbol: "♀",
    keywords: ["Abundance", "Nurturing", "Creativity", "Sensuality"],
    reversedKeywords: ["Creative block", "Neglect", "Dependence", "Emptiness"],
    archetype: "The Creative Mother",
    journey: "The Empress is creation in its fullest expression — not just fertility of the body but fertility of ideas, projects, relationships, and beauty. She sits in a lush garden, fully at ease. She doesn't force growth; she creates the conditions for it.",
    symbolism: [
      "The abundant garden — life flourishing without force",
      "The Venus symbol — love, beauty, receptive creation",
      "The crown of twelve stars — connection to the zodiac, cycles of nature",
      "The flowing water — emotional nourishment, the creative stream",
      "The cushioned throne — comfort with abundance, no guilt about pleasure",
    ],
    uprightDeep: "Something wants to be born through you — a project, an idea, a new way of being. The Empress says: nourish it. Create the conditions. Don't rush the harvest. And let yourself enjoy the sensory experience of being alive. When did you last really taste your food?",
    reversedDeep: "You may be neglecting yourself while nurturing everyone else, or you may be creatively blocked because you've disconnected from pleasure and your body. Creation requires receptivity.",
    reflections: [
      "What are you nurturing in your life right now? What needs more care?",
      "Have you been giving to others while starving yourself?",
      "What would it look like to create something purely for the joy of it?",
    ],
    inLife: "This is a card of yes. Growth is happening. Trust the organic timeline. And take care of your body — it is the vessel for everything else.",
  },
  {
    name: "The Emperor", numeral: "IV", symbol: "♂",
    keywords: ["Structure", "Authority", "Discipline", "Stability"],
    reversedKeywords: ["Rigidity", "Control", "Tyranny", "Domination"],
    archetype: "The Sovereign Builder",
    journey: "Where The Empress creates through receptivity, The Emperor creates through structure. He sits on a stone throne in a barren landscape — he doesn't need lush surroundings because he carries his authority within. This is the part of you that builds systems, sets boundaries, and says 'this is how things will be.'",
    symbolism: [
      "The stone throne — stability built on firm foundations, not comfort",
      "The ram heads — Aries energy, leadership, initiative",
      "The armor — protection, readiness, boundaries",
      "The orb and scepter — worldly power wielded with intention",
      "The barren mountains — structure before beauty; foundation first",
    ],
    uprightDeep: "You need structure right now, not more inspiration. The vision exists — now build the container for it. This might mean setting a schedule, having a difficult conversation about expectations, or finally drawing the line you've been avoiding.",
    reversedDeep: "Your need for control may be a response to feeling unsafe. Are you building structure or building walls? There's a difference between sovereignty and domination — especially over yourself.",
    reflections: [
      "Where in your life do you need more structure or discipline?",
      "Are you exercising authority over your life, or has someone else taken the throne?",
      "Is your need for control protecting you or imprisoning you?",
    ],
    inLife: "Build the foundation. Be the authority in your own life. But remember: the best leaders serve — they don't subjugate.",
  },
  {
    name: "The Hierophant", numeral: "V", symbol: "⛪",
    keywords: ["Tradition", "Spiritual wisdom", "Teaching", "Institutions"],
    reversedKeywords: ["Rebellion", "Unconventional path", "Personal truth"],
    archetype: "The Bridge Between Worlds",
    journey: "The Hierophant is the keeper of sacred tradition — the teacher, the institution, the lineage. He represents the systems of meaning that cultures build to transmit wisdom across generations. But he also represents the moment you must decide: does this tradition serve my growth, or has it become a cage?",
    symbolism: [
      "The two pillars — the gateway between sacred and profane",
      "The triple crown — mastery of mind, body, spirit",
      "The crossed keys — access to hidden knowledge, initiation",
      "The two acolytes — students, the passing of wisdom",
      "The raised hand — blessing, but also a gesture of 'stop and listen'",
    ],
    uprightDeep: "There may be something valuable in a tradition, mentor, or system that you've been dismissing. Not everything old is outdated. Before you tear down the temple, ask what sacred knowledge lives inside it. Learning from those who came before is not weakness.",
    reversedDeep: "You are being called to forge your own spiritual path. The institution, belief system, or teacher you've been following may no longer align with your truth. This is not betrayal — it's graduation.",
    reflections: [
      "What belief systems or traditions did you inherit without questioning?",
      "Is there a teacher or teaching calling to you right now?",
      "Where do you need to trust your own authority over an external one?",
    ],
    inLife: "Upright: seek the teacher, read the book, join the practice. Reversed: you are the teacher now. Trust your own knowing.",
  },
  {
    name: "The Lovers", numeral: "VI", symbol: "❦",
    keywords: ["Love", "Union", "Values", "Choices"],
    reversedKeywords: ["Disharmony", "Misalignment", "Avoidance of choice"],
    archetype: "The Sacred Choice",
    journey: "This card is not primarily about romance — it is about alignment. The angel above the two figures represents higher guidance. The real question of The Lovers is not 'who do I love?' but 'what do I value?' Every significant relationship is a mirror of the relationship you have with yourself.",
    symbolism: [
      "The angel Raphael — divine guidance over human choice",
      "The tree of knowledge (behind the woman) — temptation, awareness",
      "The tree of fire (behind the man) — passion, twelve flames of desire",
      "The mountain between them — the challenges that test true connection",
      "Naked figures — vulnerability, nothing hidden",
    ],
    uprightDeep: "You are facing a choice that requires you to align with your deepest values, not your comfort. This might be about a relationship, but it might also be about choosing between two paths, two identities, two versions of your life. Choose from love, not fear.",
    reversedDeep: "You may be avoiding a necessary choice, staying in misalignment because the alternative feels too disruptive. Or you may be in a relationship (with a person, job, or belief) that no longer reflects who you are becoming.",
    reflections: [
      "What choice are you avoiding that your heart has already made?",
      "In your closest relationships, are you being truly seen — or performing?",
      "What values are non-negotiable for you? Are you living them?",
    ],
    inLife: "A decision is before you. Don't choose with your head alone. Ask your body, your gut, your deeper self. The right choice will feel like relief, even if it's terrifying.",
  },
  {
    name: "The Chariot", numeral: "VII", symbol: "⚔",
    keywords: ["Determination", "Willpower", "Victory", "Control"],
    reversedKeywords: ["Lack of direction", "Aggression", "Scattered energy"],
    archetype: "The Triumphant Will",
    journey: "The Chariot moves forward through sheer force of will — but notice: there are no reins. The two sphinxes (one black, one white) represent opposing forces that the charioteer must align through inner mastery, not physical control. This is not about domination. It's about directing your contradictions toward a single purpose.",
    symbolism: [
      "The two sphinxes — opposing desires, dual nature, inner conflict made productive",
      "No reins — control through intention, not force",
      "The starry canopy — guided by higher purpose, not ego alone",
      "The armor — emotional protection during forward momentum",
      "The city behind — leaving comfort for conquest",
    ],
    uprightDeep: "You have the willpower to push through. But willpower is not the same as force. The Chariot asks: can you hold your contradictions — your fear and your courage, your doubt and your ambition — and move forward anyway?",
    reversedDeep: "You may be forcing outcomes, trying to control what needs to flow, or directing your considerable energy in too many directions at once. A chariot that turns in circles goes nowhere.",
    reflections: [
      "What are the two opposing forces in your life right now? Can you hold both?",
      "Are you moving forward with purpose or running away from something?",
      "Where do you need more discipline versus more surrender?",
    ],
    inLife: "Focus. Commit. Move. But move with your whole self — not just the parts that are comfortable.",
  },
  {
    name: "Strength", numeral: "VIII", symbol: "∞",
    keywords: ["Inner strength", "Courage", "Compassion", "Patience"],
    reversedKeywords: ["Self-doubt", "Weakness", "Insecurity"],
    archetype: "The Gentle Power",
    journey: "In most depictions, a woman gently holds open the jaws of a lion. She doesn't slay it — she tames it with tenderness. This is the most misunderstood card: strength is not about domination. It's about meeting your inner beast — your rage, your hunger, your primal self — with compassion rather than war.",
    symbolism: [
      "The woman and the lion — consciousness meeting the animal self",
      "The infinity symbol — this is an ongoing relationship, not a conquest",
      "Flowers in her hair — beauty in vulnerability",
      "The open jaws — facing what terrifies you, gently",
      "White robes — purity of intention, not aggression",
    ],
    uprightDeep: "The challenge before you requires patience, not force. The part of you that is angry, afraid, or hungry needs to be met with compassion, not suppressed. You are stronger than you know — and your strength lives in your gentleness.",
    reversedDeep: "You may be at war with yourself — trying to suppress emotions, control impulses through shame, or muscle through a situation that needs tenderness. Or you may doubt your ability to handle what's coming. You can.",
    reflections: [
      "What inner 'lion' are you trying to suppress instead of befriend?",
      "Where do you mistake gentleness for weakness?",
      "What situation in your life requires patience rather than force right now?",
    ],
    inLife: "Be gentle with yourself. The strength you need isn't loud or dramatic — it's the quiet decision to stay open when everything in you wants to close.",
  },
  {
    name: "The Hermit", numeral: "IX", symbol: "🏔",
    keywords: ["Solitude", "Inner wisdom", "Guidance", "Contemplation"],
    reversedKeywords: ["Isolation", "Withdrawal", "Loneliness"],
    archetype: "The Inner Light",
    journey: "The Hermit stands alone on a mountain, holding a lantern that contains a single star. He has withdrawn from the world — not out of fear, but because the answers he seeks cannot be found in the noise of society. Sometimes the bravest thing you can do is be alone with yourself.",
    symbolism: [
      "The mountain peak — spiritual elevation through solitude",
      "The lantern — inner wisdom illuminating the path",
      "The star inside the lantern — the Seal of Solomon, integration of opposites",
      "The grey cloak — invisibility, humility, withdrawal from performance",
      "The staff — experience, earned wisdom, groundedness",
    ],
    uprightDeep: "You need solitude right now. Not the scrolling-alone-on-the-couch kind, but real solitude — the kind where you turn everything off and sit with what comes up. The Hermit says: the answer is inside you, but you have to get quiet enough to hear it.",
    reversedDeep: "There's a difference between healthy solitude and avoidant isolation. Are you withdrawing to find yourself, or withdrawing to hide? If your alone time feels nourishing, stay. If it feels like punishment, reach out.",
    reflections: [
      "When was the last time you were truly alone — with no input, no distraction?",
      "What wisdom have you earned that you haven't yet integrated?",
      "Are you isolating out of choice or out of fear?",
    ],
    inLife: "Take time apart. Cancel something. Go for a long walk alone. The insight you need is already forming — it just needs silence to arrive.",
  },
  {
    name: "Wheel of Fortune", numeral: "X", symbol: "☸",
    keywords: ["Cycles", "Fate", "Turning point", "Luck"],
    reversedKeywords: ["Resistance to change", "Bad luck", "Stagnation"],
    archetype: "The Eternal Cycle",
    journey: "The Wheel spins whether you want it to or not. This card reminds you that change is the only constant. What goes up will come down. What has fallen will rise. You are not in control of the wheel — but you can choose how you ride it.",
    symbolism: [
      "The wheel itself — cycles of fortune, impermanence",
      "The four figures in the corners — the fixed signs (Taurus, Leo, Scorpio, Aquarius), stability within change",
      "The sphinx at the top — wisdom that endures above the turning",
      "The snake descending — what falls must be released",
      "The Anubis rising — what was buried returns",
    ],
    uprightDeep: "Something is shifting. A cycle is completing or beginning. This is not random — it is the natural rhythm of your life. The Wheel asks you to stop resisting the turn and trust that this change, however disorienting, is part of your evolution.",
    reversedDeep: "You may be fighting a change that has already happened, or you may be stuck in a cycle you haven't yet recognized. What pattern keeps repeating? The exit from the loop is awareness.",
    reflections: [
      "What cycle in your life is completing right now?",
      "What pattern keeps repeating that you haven't yet learned from?",
      "Can you surrender to a change that feels out of your control?",
    ],
    inLife: "Something is turning. Let it. Your job is not to stop the wheel but to find your center within it.",
  },
  {
    name: "Justice", numeral: "XI", symbol: "⚖",
    keywords: ["Truth", "Fairness", "Accountability", "Clarity"],
    reversedKeywords: ["Dishonesty", "Avoidance", "Unfairness"],
    archetype: "The Clear-Eyed Judge",
    journey: "Justice holds a sword in one hand (truth cuts) and scales in the other (everything must balance). This is not punitive justice — it is karmic precision. Every action has a consequence. Every lie creates a debt. Justice asks: are you willing to see the truth clearly, even when it implicates you?",
    symbolism: ["The sword — truth, even when it cuts", "The scales — balance, cause and effect", "The veil — impartiality, truth beyond personal bias", "The throne — authority earned through integrity", "The square clasp — logical, grounded decision-making"],
    uprightDeep: "Something needs to be made right. This could be an external situation requiring fairness, or an internal reckoning — owning your part in something you've been blaming on others. Truth and accountability set you free, even when they sting.",
    reversedDeep: "You may be avoiding accountability or rationalizing a decision you know is unfair — to yourself or others. The scales are tipped. What are you refusing to look at honestly?",
    reflections: ["Where in your life are you being dishonest — even with yourself?", "What situation requires you to take full accountability?", "Is there a decision you've been postponing because the fair answer isn't the easy one?"],
    inLife: "Be honest. The discomfort of truth is temporary. The cost of avoidance compounds.",
  },
  {
    name: "The Hanged Man", numeral: "XII", symbol: "⊥",
    keywords: ["Surrender", "New perspective", "Letting go", "Pause"],
    reversedKeywords: ["Stalling", "Resistance", "Martyrdom"],
    archetype: "The Willing Sacrifice",
    journey: "The Hanged Man is suspended upside down — but look at his face: he is serene. He chose this. Sometimes the most powerful thing you can do is stop trying to fix, control, or escape your situation and instead surrender to it completely. Inversion changes everything.",
    symbolism: ["Hanging upside down — seeing the world from a completely different angle", "The halo — enlightenment through surrender", "One leg crossed — forming a figure 4, stability within suspension", "The living tree — growth continues even in stillness", "Calm expression — this is chosen, not imposed"],
    uprightDeep: "Stop pushing. The answer won't come through effort right now — it will come through release. Let go of the timeline, the outcome, the need to know. Hang there. Something will shift in the suspension that could never shift through force.",
    reversedDeep: "You may be suffering unnecessarily because you refuse to let go, or you may be stuck in a pattern of martyrdom — sacrificing yourself and calling it virtue. Surrender is not the same as giving up.",
    reflections: ["What are you gripping that needs to be released?", "What would change if you stopped trying to control this outcome?", "Can you find peace in not-knowing?"],
    inLife: "Pause. The doing is done for now. Let gravity and time work on what your effort cannot.",
  },
  {
    name: "Death", numeral: "XIII", symbol: "☠",
    keywords: ["Transformation", "Endings", "Release", "Rebirth"],
    reversedKeywords: ["Resistance to change", "Fear of endings", "Stagnation"],
    archetype: "The Great Transformer",
    journey: "Death is the most feared and most misunderstood card. It almost never signifies physical death. It signifies the end of a chapter — an identity, a relationship, a belief, a way of being — that must die for the next version of you to be born. The skeleton rides forward because death cannot be stopped. But look: the sun rises in the background.",
    symbolism: ["The skeleton — what remains when all pretense is stripped away", "The white rose flag — beauty and purity of transformation", "The rising sun — rebirth always follows death", "The fallen king — no status can prevent transformation", "The river — the flow of life continues"],
    uprightDeep: "Something is ending, and you must let it. This is not a punishment — it is a liberation. The identity, relationship, or situation that served you is complete. Grieve it, honor it, and release it. What is trying to be born needs the space.",
    reversedDeep: "You are clinging to something that has already died. The refusal to let go is not loyalty — it is fear. What are you keeping alive that needs a proper burial?",
    reflections: ["What part of your life has already ended that you haven't acknowledged?", "What identity are you holding onto that no longer fits?", "If you allowed this ending, what could begin?"],
    inLife: "Let it end. The grief is real and valid. But on the other side of this death is a version of you that you cannot yet imagine.",
  },
  {
    name: "Temperance", numeral: "XIV", symbol: "△",
    keywords: ["Balance", "Patience", "Moderation", "Integration"],
    reversedKeywords: ["Imbalance", "Excess", "Misalignment"],
    archetype: "The Alchemist",
    journey: "After the upheaval of Death, Temperance appears as the calm integration. An angel pours water between two cups — blending opposites into something new. This is the art of alchemy: not choosing between fire and water but learning to hold both. Temperance asks for patience with the process of becoming.",
    symbolism: ["The two cups — blending opposites, integration", "One foot on land, one in water — grounded in both reality and emotion", "The path to the mountains — a long journey, not a sprint", "The triangle on the chest — spirit within matter", "The iris flowers — the goddess Iris, bridge between worlds"],
    uprightDeep: "Find the middle way. Not compromise — integration. You don't have to choose between ambition and peace, logic and feeling, solitude and connection. The mature path holds both. This takes patience, which is exactly the lesson.",
    reversedDeep: "Something in your life is out of balance — you're giving too much to one area and starving another. Or you're impatient with a process that needs time. Recalibrate.",
    reflections: ["Where in your life are you swinging between extremes?", "What two opposing qualities are you being asked to integrate?", "Can you trust that this process has its own timeline?"],
    inLife: "You're in the middle of a transformation. Don't rush it. The blending is delicate work.",
  },
  {
    name: "The Devil", numeral: "XV", symbol: "⛧",
    keywords: ["Shadow", "Bondage", "Attachment", "Materialism"],
    reversedKeywords: ["Liberation", "Breaking free", "Reclaiming power"],
    archetype: "The Shadow Mirror",
    journey: "The Devil shows two figures chained to a pedestal — but look closely: the chains are loose. They could leave at any time. This card is not about external evil. It is about the attachments, addictions, and shadow patterns that you have given your power to while pretending you have no choice.",
    symbolism: ["The loose chains — you are not as trapped as you believe", "The inverted pentagram — spirit subordinated to matter", "The Baphomet figure — the shadow self in full, honest display", "The flames on the tails — passion misdirected, compulsion", "The darkness — what you refuse to see about yourself"],
    uprightDeep: "Where are you lying to yourself about being trapped? What addiction, relationship, pattern, or belief are you giving your power to? The Devil's deepest teaching: the cage is real, but the door is open. The only thing keeping you in is the part of you that is afraid of freedom.",
    reversedDeep: "You are waking up. The chain is loosening. You are beginning to see the pattern for what it is. This is liberation, but it can feel terrifying — because freedom requires responsibility.",
    reflections: ["What are you addicted to — substances, validation, control, comfort?", "Where are you pretending to be trapped when you could actually leave?", "What shadow pattern runs your life when you're not paying attention?"],
    inLife: "Name the chain. See it clearly. Then decide: do you want to stay, or do you want to be free?",
  },
  {
    name: "The Tower", numeral: "XVI", symbol: "⚡",
    keywords: ["Upheaval", "Revelation", "Sudden change", "Awakening"],
    reversedKeywords: ["Fear of change", "Delayed destruction", "Avoiding truth"],
    archetype: "The Sacred Destruction",
    journey: "Lightning strikes the tower, figures fall, fire burns. This is the most dramatic card in the deck — and often the most important. The Tower was built on a false foundation: ego, lies, or structures that no longer serve. It must fall so something true can be built. This is not punishment. It is liberation disguised as disaster.",
    symbolism: ["The lightning bolt — sudden truth, divine disruption", "The crown blown off — ego dethroned", "The falling figures — letting go of old identity", "The flames — purification, not destruction", "The 22 flames — the full journey of the Major Arcana, all lessons present"],
    uprightDeep: "Something is crumbling or about to crumble. Let it. Whatever falls was not built on truth. The Tower is painful but it is the fastest path to authenticity. After the collapse, you will find ground you can actually stand on.",
    reversedDeep: "You may be trying to hold together something that needs to fall, or you may sense the rumbling but refuse to evacuate. The longer you delay the collapse, the more it will hurt.",
    reflections: ["What structure in your life is built on a lie?", "What would it mean if you let this thing fall apart?", "Can you trust that destruction is sometimes the doorway to truth?"],
    inLife: "Brace yourself — not against the fall, but for the clarity that follows it. What remains after the tower falls is what was always real.",
  },
  {
    name: "The Star", numeral: "XVII", symbol: "✦",
    keywords: ["Hope", "Healing", "Renewal", "Faith"],
    reversedKeywords: ["Despair", "Disconnection", "Lost faith"],
    archetype: "The Quiet Healer",
    journey: "After the devastation of The Tower, The Star appears — the gentlest card in the deck. A figure kneels by water under a sky full of stars, pouring water onto the land and back into the pool. This is recovery. This is the moment after the crisis when you realize: I survived. And something has been cleansed.",
    symbolism: ["The eight-pointed star — Venus, hope, renewal", "The seven smaller stars — the seven chakras, wholeness", "Water on land and in pool — nourishing both the conscious and subconscious", "Nakedness — vulnerability after pretense has been stripped away", "The ibis bird — Thoth, sacred wisdom returning"],
    uprightDeep: "You are healing. It may not feel dramatic or fast, but the restoration is happening. The Star asks you to trust the quiet process of renewal. Have faith — not in an outcome, but in your own resilience.",
    reversedDeep: "You may have lost faith — in yourself, in life, in the possibility that things can be good again. The star is still there, even when clouds block your view. Despair is valid, but it is not the whole truth.",
    reflections: ["Where is healing happening in your life that you haven't acknowledged?", "What are you hoping for that you're afraid to admit?", "Can you be vulnerable enough to receive help?"],
    inLife: "Breathe. You made it through something hard. Now let the healing happen. It will be slow and quiet, and that's exactly right.",
  },
  {
    name: "The Moon", numeral: "XVIII", symbol: "☾",
    keywords: ["Illusion", "Subconscious", "Intuition", "Fear"],
    reversedKeywords: ["Clarity", "Release of fear", "Truth emerging"],
    archetype: "The Deep Unknown",
    journey: "The Moon illuminates, but it also distorts. Under its light, everything looks different — shadows are longer, paths are unclear, and the boundary between dream and reality blurs. This is the realm of the subconscious: rich, powerful, and disorienting.",
    symbolism: ["The moon — reflected light, not direct truth", "The two towers — the gateway to the unknown", "The dog and the wolf — the tamed and wild aspects of self", "The crayfish emerging from water — deep unconscious content surfacing", "The winding path — the journey through confusion toward clarity"],
    uprightDeep: "Things are not what they seem. Your perception may be distorted by fear, projection, or old stories. The Moon asks you not to make permanent decisions in temporary confusion. Walk the path, but walk it slowly. Trust your dreams more than your anxieties.",
    reversedDeep: "Clarity is returning after a period of confusion. Something you feared turns out to be less threatening than it appeared. The illusion is dissolving.",
    reflections: ["What fears are distorting your perception right now?", "What is your dream life trying to tell you?", "Where are you confusing intuition with anxiety?"],
    inLife: "Don't trust everything you think right now. Let the fog clear. The truth will be visible soon — but not yet.",
  },
  {
    name: "The Sun", numeral: "XIX", symbol: "☀",
    keywords: ["Joy", "Vitality", "Success", "Clarity"],
    reversedKeywords: ["Dimmed joy", "Overexposure", "Burnout"],
    archetype: "The Inner Child Restored",
    journey: "After the confusion of The Moon, The Sun brings total clarity. A child rides freely under blazing light — no shadows, no pretense, no fear. This is the return to wholeness. Not the innocence of The Fool (who hasn't yet experienced), but the earned joy of one who has walked through darkness and emerged.",
    symbolism: ["The radiant sun — truth with nothing hidden", "The child — the integrated inner child, joy reclaimed", "The white horse — purified instincts, noble direction", "The sunflowers — growth that follows the light", "The wall — the boundary crossed, limitations transcended"],
    uprightDeep: "Joy is available to you right now — real joy, not performed happiness. Something has cleared. Allow yourself to feel good without waiting for the other shoe to drop. The Sun says: you've earned this light.",
    reversedDeep: "You may be dimming your own light — downplaying success, deflecting joy, burning too bright and approaching burnout. Joy requires the same protection as vulnerability.",
    reflections: ["Where are you blocking your own happiness?", "What would it feel like to enjoy this moment without guilt?", "When did you last feel truly, unconditionally joyful?"],
    inLife: "Let it be good. Stop bracing for impact. This moment of light is real.",
  },
  {
    name: "Judgement", numeral: "XX", symbol: "♱",
    keywords: ["Calling", "Rebirth", "Reckoning", "Purpose"],
    reversedKeywords: ["Self-doubt", "Ignoring the call", "Inner critic"],
    archetype: "The Final Awakening",
    journey: "An angel sounds a trumpet and the dead rise from their coffins — not in fear, but in answer. Judgement is the moment you hear the call. Not a religious judgment of sin, but a soul-level reckoning: who have I been, who am I truly, and what am I called to become?",
    symbolism: ["The trumpet — the call that cannot be ignored", "The rising figures — resurrection of your true self", "The coffins — the containers of your old identity", "The flag with the cross — the meeting of the spiritual and material", "The mountains of water — emotional depth that has been traversed"],
    uprightDeep: "You are being called to something. You feel it. Maybe you've been feeling it for a long time. Judgement says: answer. The old version of you has served its purpose. Rise into what's next.",
    reversedDeep: "You hear the call but you're not answering. Self-doubt, inner criticism, or fear of judgment is keeping you in the coffin. What would happen if you trusted that you are ready?",
    reflections: ["What is calling to you that you keep ignoring?", "What version of yourself needs to be buried so the new one can rise?", "If you trusted yourself completely, what would you do next?"],
    inLife: "This is your moment. Answer the call. You are ready, even if you don't feel ready.",
  },
  {
    name: "The World", numeral: "XXI", symbol: "◉",
    keywords: ["Completion", "Wholeness", "Integration", "Fulfillment"],
    reversedKeywords: ["Incompletion", "Shortcuts", "Unfinished lessons"],
    archetype: "The Dance of Wholeness",
    journey: "The final card. A figure dances within a wreath of victory, surrounded by the four fixed signs of the zodiac. This is not an ending — it is an integration. Everything you have experienced through The Fool's Journey is now part of you. You are complete. Not perfect. Complete.",
    symbolism: ["The wreath — the cycle complete, the eternal return", "The dancing figure — celebration, movement, aliveness", "The four corners — mastery of all elements, all aspects of self", "The two wands — balance, duality held in harmony", "The purple sash — spiritual royalty, sovereignty earned"],
    uprightDeep: "A cycle is complete. You have integrated the lesson. Take a moment to feel the fullness of where you are — not rushing to the next thing, but honoring this moment of wholeness. You are exactly where you need to be.",
    reversedDeep: "You may be trying to skip ahead, take shortcuts, or move to the next cycle without fully completing this one. What lesson remains unlearned? What thread is still loose?",
    reflections: ["What cycle in your life has just completed? Can you honor it?", "What have you integrated about yourself through this journey?", "Before you begin again — what do you want to carry forward?"],
    inLife: "You made it. Feel that. Then, when you're ready, step to the cliff's edge again. The Fool awaits.",
  },
];

// ─── READING TECHNIQUES ────────────────────────────────────
const TECHNIQUES = [
  {
    title: "Before You Read",
    content: "Clear your mind. Hold the deck. Take three breaths. You don't need to 'believe' in anything — you just need to be honest with yourself. The cards are mirrors, not prophets. Whatever meaning you find is the meaning that was already inside you.",
  },
  {
    title: "Single Card Pull",
    content: "The simplest and most powerful practice. Ask a question or simply say 'what do I need to see today?' Draw one card. Sit with it. Don't rush to look up the meaning — first notice your gut reaction. Relief? Dread? Recognition? That reaction is the reading.",
  },
  {
    title: "Three-Card Spread",
    content: "Past · Present · Future is the classic, but try these alternatives: What I'm leaving · Where I am · What I'm moving toward. The situation · What I'm not seeing · The invitation. Mind · Body · Spirit.",
  },
  {
    title: "Reading Reversals",
    content: "A reversed card is not 'bad.' It often means the energy is internalized, blocked, or in its shadow form. Upright Strength is quiet courage; reversed Strength might be self-doubt. Think of reversals as the same energy turned inward or distorted.",
  },
  {
    title: "Intuition Over Memorization",
    content: "Study the card meanings, yes — but never let the book override your gut. If you draw The Sun and feel sadness, explore that. Your personal response is always the first layer of the reading. The traditional meaning is the second.",
  },
  {
    title: "Journaling After a Reading",
    content: "Write down the card(s) you drew, your immediate reaction, and what it connects to in your life. Return to this entry in a week. You'll be amazed at what becomes clear in retrospect.",
  },
];

// ─── COMPONENT ─────────────────────────────────────────────
export default function LearnTarotPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showTechniques, setShowTechniques] = useState(true);

  const card = selectedCard !== null ? LESSONS[selectedCard] : null;

  return (
    <PageWrapper>
      <PageHeader icon="✦" title="Learn Tarot" subtitle="A complete guide to reading the Major Arcana" />
      <CosmicDivider />

      {/* Back link */}
      <div className="mb-6">
        <Link href="/learn" className="text-xs tracking-[1px] uppercase transition-colors" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
          ← Back to Learn
        </Link>
      </div>

      {/* Reading Techniques */}
      <button
        onClick={() => setShowTechniques(!showTechniques)}
        className="w-full text-left glass p-4 mb-4 flex justify-between items-center"
      >
        <span className="text-sm tracking-wide" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
          ☽ How to Read Tarot
        </span>
        <span className="text-sm transition-transform duration-300" style={{ color: "var(--text-muted)", transform: showTechniques ? "rotate(90deg)" : "rotate(0)" }}>›</span>
      </button>

      <AnimatePresence>
        {showTechniques && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
            <div className="space-y-3">
              {TECHNIQUES.map((t, i) => (
                <div key={i} className="glass p-4">
                  <div className="text-xs tracking-[1.5px] uppercase mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>{t.title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CosmicDivider />

      {/* Card selector grid */}
      <h3 className="text-xs tracking-[2px] uppercase text-center mb-4" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
        Select a card to study
      </h3>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-8">
        {LESSONS.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelectedCard(selectedCard === i ? null : i)}
            className="p-2.5 rounded-lg text-center transition-all duration-300"
            style={{
              background: selectedCard === i ? "rgba(212,165,74,0.15)" : "rgba(12,18,37,0.6)",
              border: `1px solid ${selectedCard === i ? "rgba(212,165,74,0.3)" : "var(--border-subtle)"}`,
            }}
          >
            <div className="text-lg mb-0.5">{c.symbol}</div>
            <div className="text-[8px] leading-tight" style={{ color: selectedCard === i ? "var(--text-accent)" : "var(--text-muted)" }}>
              {c.numeral}
            </div>
          </button>
        ))}
      </div>

      {/* Card detail */}
      <AnimatePresence mode="wait">
        {card && (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="glass p-6 text-center">
              <div className="text-3xl mb-2">{card.symbol}</div>
              <h2 className="text-xl mb-1" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
                {card.numeral} · {card.name}
              </h2>
              <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>{card.archetype}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {card.keywords.map(k => (
                  <span key={k} className="text-[10px] px-2.5 py-1 rounded-full" style={{ background: "rgba(212,165,74,0.08)", color: "var(--text-secondary)", border: "1px solid rgba(212,165,74,0.12)" }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* The Journey */}
            <div className="glass p-5">
              <h3 className="text-xs tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>The Journey</h3>
              <p className="text-sm leading-[1.8]" style={{ color: "var(--text-secondary)" }}>{card.journey}</p>
            </div>

            {/* Symbolism */}
            <div className="glass p-5">
              <h3 className="text-xs tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>Symbolism</h3>
              <div className="space-y-2">
                {card.symbolism.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-xs mt-1" style={{ color: "var(--text-accent)" }}>·</span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upright */}
            <div className="glass p-5">
              <h3 className="text-xs tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--aurora)" }}>Upright</h3>
              <p className="text-sm leading-[1.8]" style={{ color: "var(--text-secondary)" }}>{card.uprightDeep}</p>
            </div>

            {/* Reversed */}
            <div className="glass p-5">
              <h3 className="text-xs tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--nebula-pink)" }}>Reversed</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {card.reversedKeywords.map(k => (
                  <span key={k} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(123,74,110,0.1)", color: "var(--text-secondary)", border: "1px solid rgba(123,74,110,0.15)" }}>{k}</span>
                ))}
              </div>
              <p className="text-sm leading-[1.8]" style={{ color: "var(--text-secondary)" }}>{card.reversedDeep}</p>
            </div>

            {/* Reflections */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(212,165,74,0.04)", border: "1px solid rgba(212,165,74,0.1)" }}>
              <h3 className="text-xs tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>Questions for Reflection</h3>
              <div className="space-y-2.5">
                {card.reflections.map((r, i) => (
                  <p key={i} className="text-sm italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {r}
                  </p>
                ))}
              </div>
            </div>

            {/* In Life */}
            <div className="glass p-5">
              <h3 className="text-xs tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>When This Card Appears</h3>
              <p className="text-sm leading-[1.8]" style={{ color: "var(--text-primary)" }}>{card.inLife}</p>
            </div>

            {/* Nav between cards */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setSelectedCard(Math.max(0, (selectedCard ?? 0) - 1))}
                disabled={selectedCard === 0}
                className="text-xs tracking-[1px] uppercase transition-opacity"
                style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)", opacity: selectedCard === 0 ? 0.3 : 1 }}
              >
                ← Previous
              </button>
              <button
                onClick={() => setSelectedCard(Math.min(LESSONS.length - 1, (selectedCard ?? 0) + 1))}
                disabled={selectedCard === LESSONS.length - 1}
                className="text-xs tracking-[1px] uppercase transition-opacity"
                style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)", opacity: selectedCard === LESSONS.length - 1 ? 0.3 : 1 }}
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
