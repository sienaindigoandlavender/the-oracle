export type OuijaAnswer = "YES" | "NO" | "UNCERTAIN";

export interface OuijaResponse {
  answer: OuijaAnswer;
  whisper: string; // A short intuitive nudge
}

// Weighted pool: ~40% yes, ~40% no, ~20% uncertain
const YES_WHISPERS = [
  "The path is clear.",
  "Trust what you already feel.",
  "The answer was always within you.",
  "Move forward with quiet confidence.",
  "Something is aligning in your favor.",
  "Your intuition is correct.",
  "The door is open — walk through.",
  "You have permission to believe this.",
];

const NO_WHISPERS = [
  "Not this. Something better awaits.",
  "Listen to the resistance — it protects you.",
  "This is not your path right now.",
  "Release what you are holding too tightly.",
  "Look at what you are avoiding.",
  "The timing is wrong, not you.",
  "There is a lesson in this no.",
  "What you truly need lies elsewhere.",
];

const UNCERTAIN_WHISPERS = [
  "The answer lives in a question you haven't asked yet.",
  "Sit with the not-knowing a little longer.",
  "You are asking with your mind. Ask with your body.",
  "Come back when the moon changes.",
  "The spirits see fog where you see a road.",
  "Ask again — but ask what you really mean.",
];

export function getOuijaResponse(): OuijaResponse {
  const roll = Math.random();
  if (roll < 0.4) {
    return { answer: "YES", whisper: YES_WHISPERS[Math.floor(Math.random() * YES_WHISPERS.length)] };
  } else if (roll < 0.8) {
    return { answer: "NO", whisper: NO_WHISPERS[Math.floor(Math.random() * NO_WHISPERS.length)] };
  } else {
    return { answer: "UNCERTAIN", whisper: UNCERTAIN_WHISPERS[Math.floor(Math.random() * UNCERTAIN_WHISPERS.length)] };
  }
}
