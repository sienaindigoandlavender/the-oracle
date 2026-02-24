export interface JournalPrompt {
  text: string;
  theme: string;
  followUp?: string;
}

export const SHADOW_PROMPTS: JournalPrompt[] = [
  // Identity & Self
  { text: "What version of yourself are you performing today? Who would you be if no one was watching?", theme: "Identity", followUp: "Write without editing. Let the truth be messy." },
  { text: "What story do you keep telling about yourself that might not be true anymore?", theme: "Identity", followUp: "Notice where the story protects you from something." },
  { text: "If you could introduce yourself honestly — no titles, no roles — what would you say?", theme: "Identity" },
  { text: "What part of your identity would terrify you to lose? Why does it hold such power?", theme: "Identity" },
  { text: "Who were you before the world told you who to be?", theme: "Identity" },

  // Shadow Work
  { text: "What quality do you judge most harshly in others? Where does it live in you?", theme: "Shadow", followUp: "The things we cannot accept in others are often the things we cannot accept in ourselves." },
  { text: "What are you pretending not to know?", theme: "Shadow" },
  { text: "What do you do when no one is looking that you would never admit?", theme: "Shadow", followUp: "Shame loses its power when it is witnessed." },
  { text: "What emotion are you most afraid of feeling fully?", theme: "Shadow" },
  { text: "If your shadow self wrote you a letter, what would it say?", theme: "Shadow", followUp: "Try writing it. Let the shadow speak in first person." },
  { text: "What is the worst thing someone could say about you? Is any of it true?", theme: "Shadow" },
  { text: "Where in your life are you choosing comfort over truth?", theme: "Shadow" },

  // Wounds & Healing
  { text: "What wound are you still carrying that you thought you had healed?", theme: "Healing", followUp: "Healing is not linear. Some wounds teach us in layers." },
  { text: "What did you need to hear as a child that no one ever said?", theme: "Healing", followUp: "Can you say it to yourself now? Write it down." },
  { text: "Who hurt you in a way you have never fully acknowledged?", theme: "Healing" },
  { text: "What are you grieving that you haven't given yourself permission to grieve?", theme: "Healing" },
  { text: "Where in your body do you store your pain? What does it want to tell you?", theme: "Healing" },

  // Fear & Resistance
  { text: "What are you avoiding right now? What happens if you stop avoiding it?", theme: "Fear" },
  { text: "What would you do if you knew you couldn't fail? Now — what if you knew you *would* fail?", theme: "Fear", followUp: "The second answer reveals what you actually love." },
  { text: "What truth are you afraid to speak out loud?", theme: "Fear" },
  { text: "What are you protecting yourself from that may no longer be a threat?", theme: "Fear" },

  // Power & Sovereignty
  { text: "Where have you given your power away? To whom?", theme: "Power" },
  { text: "What boundary do you need to set that you keep avoiding?", theme: "Power" },
  { text: "What would your most sovereign self do differently today?", theme: "Power", followUp: "Not the 'ideal' self. The real, integrated, powerful one." },
  { text: "Where are you seeking permission when you already have the authority?", theme: "Power" },

  // Desire & Purpose
  { text: "What do you actually want — not what you think you should want?", theme: "Desire" },
  { text: "What desire have you been ashamed of? What if it was wise?", theme: "Desire" },
  { text: "If your life was a story, what chapter are you in? What chapter do you want to be in?", theme: "Desire" },
  { text: "What keeps calling to you that you keep ignoring?", theme: "Desire" },

  // Relationships & Mirrors
  { text: "Who triggers you most? What are they showing you about yourself?", theme: "Mirrors", followUp: "Others are often mirrors reflecting parts of us we haven't integrated." },
  { text: "What do you need from others that you are not giving yourself?", theme: "Mirrors" },
  { text: "In your most important relationship, where are you not being honest?", theme: "Mirrors" },

  // Death & Transformation
  { text: "What part of you needs to die for the next version of you to be born?", theme: "Transformation" },
  { text: "If this was your last day, what would you regret not saying?", theme: "Transformation" },
  { text: "What are you holding onto that is already gone?", theme: "Transformation" },
  { text: "What is ending in your life right now? Can you let it end?", theme: "Transformation", followUp: "Endings are doorways. Walk through." },
];

export const THEMES = [...new Set(SHADOW_PROMPTS.map(p => p.theme))];

export function getRandomPrompt(theme?: string): JournalPrompt {
  const pool = theme ? SHADOW_PROMPTS.filter(p => p.theme === theme) : SHADOW_PROMPTS;
  return pool[Math.floor(Math.random() * pool.length)];
}
