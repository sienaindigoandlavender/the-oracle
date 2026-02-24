export interface TarotCard {
  name: string;
  numeral: string;
  symbol: string;
  meaning: string;
  reversed: string;
}

export const MAJOR_ARCANA: TarotCard[] = [
  { name: "The Fool", numeral: "0", symbol: "🃏", meaning: "New beginnings, innocence, spontaneity, free spirit. A leap of faith into the unknown.", reversed: "Recklessness, risk-taking, holding back, foolishness." },
  { name: "The Magician", numeral: "I", symbol: "✧", meaning: "Manifestation, resourcefulness, power, inspired action. You have everything you need.", reversed: "Manipulation, poor planning, untapped talents." },
  { name: "The High Priestess", numeral: "II", symbol: "☽", meaning: "Intuition, sacred knowledge, divine feminine, the subconscious mind.", reversed: "Secrets, withdrawal, silence, repressed intuition." },
  { name: "The Empress", numeral: "III", symbol: "♀", meaning: "Femininity, beauty, nature, nurturing, abundance. Creation flows through you.", reversed: "Creative block, dependence, emptiness, smothering." },
  { name: "The Emperor", numeral: "IV", symbol: "♂", meaning: "Authority, structure, control, fatherhood. A solid foundation built on discipline.", reversed: "Tyranny, rigidity, coldness, excessive control." },
  { name: "The Hierophant", numeral: "V", symbol: "⛪", meaning: "Spiritual wisdom, tradition, conformity, morality, ethics.", reversed: "Personal beliefs, freedom, challenging the status quo." },
  { name: "The Lovers", numeral: "VI", symbol: "❦", meaning: "Love, harmony, relationships, values alignment, choices of the heart.", reversed: "Self-love, disharmony, imbalance, misalignment of values." },
  { name: "The Chariot", numeral: "VII", symbol: "⚔", meaning: "Control, willpower, success, determination. Victory through inner strength.", reversed: "Self-discipline, opposition, lack of direction." },
  { name: "Strength", numeral: "VIII", symbol: "∞", meaning: "Inner strength, bravery, compassion, focus. The quiet power within.", reversed: "Self-doubt, weakness, insecurity, raw emotion." },
  { name: "The Hermit", numeral: "IX", symbol: "🏔", meaning: "Soul-searching, introspection, being alone, inner guidance. Seek and you shall find.", reversed: "Isolation, loneliness, withdrawal, lost your way." },
  { name: "Wheel of Fortune", numeral: "X", symbol: "☸", meaning: "Good luck, karma, life cycles, destiny, a turning point in your journey.", reversed: "Bad luck, resistance to change, breaking cycles." },
  { name: "Justice", numeral: "XI", symbol: "⚖", meaning: "Fairness, truth, cause and effect, law. The scales must balance.", reversed: "Unfairness, lack of accountability, dishonesty." },
  { name: "The Hanged Man", numeral: "XII", symbol: "⊥", meaning: "Pause, surrender, letting go, new perspectives. See the world differently.", reversed: "Delays, resistance, stalling, indecision." },
  { name: "Death", numeral: "XIII", symbol: "☠", meaning: "Endings, change, transformation, transition. What must end so something new may begin.", reversed: "Resistance to change, personal transformation, inner purging." },
  { name: "Temperance", numeral: "XIV", symbol: "△", meaning: "Balance, moderation, patience, purpose. Find your middle path.", reversed: "Imbalance, excess, self-healing, re-alignment." },
  { name: "The Devil", numeral: "XV", symbol: "⛧", meaning: "Shadow self, attachment, addiction, restriction, sexuality.", reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment." },
  { name: "The Tower", numeral: "XVI", symbol: "⚡", meaning: "Sudden change, upheaval, chaos, revelation, awakening. What was built on lies must fall.", reversed: "Personal transformation, fear of change, averting disaster." },
  { name: "The Star", numeral: "XVII", symbol: "✦", meaning: "Hope, faith, purpose, renewal, spirituality. A guiding light in the darkness.", reversed: "Lack of faith, despair, self-trust, disconnection." },
  { name: "The Moon", numeral: "XVIII", symbol: "☾", meaning: "Illusion, fear, anxiety, subconscious, intuition. Not all is as it seems.", reversed: "Release of fear, repressed emotion, inner confusion." },
  { name: "The Sun", numeral: "XIX", symbol: "☀", meaning: "Positivity, fun, warmth, success, vitality. Pure joy and radiance.", reversed: "Inner child, feeling down, overly optimistic." },
  { name: "Judgement", numeral: "XX", symbol: "♱", meaning: "Judgement, rebirth, inner calling, absolution. Rise up and answer your calling.", reversed: "Self-doubt, inner critic, ignoring the call." },
  { name: "The World", numeral: "XXI", symbol: "◉", meaning: "Completion, integration, accomplishment, travel. The end of one cycle, the beginning of another.", reversed: "Incompletion, shortcuts, seeking personal closure." }
];

export const SPREAD_LABELS: Record<string, string[]> = {
  single: ["The Answer"],
  three: ["Past", "Present", "Future"],
  five: ["Situation", "Challenge", "Foundation", "Recent Past", "Potential"],
  celtic: [
    "Present",
    "Challenge",
    "Foundation",
    "Recent Past",
    "Higher Purpose",
    "Near Future",
    "Your Attitude",
    "External Influences",
    "Hopes & Fears",
    "Outcome",
  ],
};
