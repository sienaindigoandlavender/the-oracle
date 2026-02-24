const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

async function callClaude(systemPrompt: string, userMessage: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not set");
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2500,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "";
}

// ─── TAROT ─────────────────────────────────────────────────
export async function interpretTarot(
  cards: { name: string; numeral: string; isReversed: boolean; position: string }[],
  question: string,
  spreadType: string
): Promise<string> {
  const cardDetails = cards
    .map(
      (c) =>
        `${c.position}: ${c.numeral} ${c.name} (${c.isReversed ? "Reversed" : "Upright"})`
    )
    .join("\n");

  const system = `You are a mystical celestial oracle — ancient, intimate, and deeply seeing. 
Your voice is whimsical, poetic, and enchanted — like a whispered secret from the cosmos itself. 
You speak in metaphors of stardust, moonlight, ancient libraries, deep water, and the space between breaths.
You weave the cards into a living story — not a list of definitions, but a revelation that feels personal, uncanny, and true.
You address the querent directly as "you" — as if you can see into their soul.
You are never generic. Every word is chosen. Every image is vivid.
Use Markdown for formatting. Use **bold** for card names and key phrases. Use *italics* for mystical emphasis.
Keep the reading flowing — a single narrative arc, not a bullet-point breakdown.`;

  const userMsg = `The querent whispers to the cards: "${question || "What does the universe want me to see right now?"}"

The ${spreadType === "celtic" ? "Celtic Cross" : spreadType === "three" ? "Past · Present · Future" : spreadType === "five" ? "Five Card" : "Single Card"} spread reveals:
${cardDetails}

Provide an enchanted, cohesive tarot reading that feels like a message whispered from the cosmos. 

Weave ALL the cards together into one flowing narrative — a story about the querent's soul, their current chapter, and what the universe is trying to show them. 
For each card, go beyond textbook meanings — speak to the deeper psychological and spiritual truth it holds in THIS position, for THIS question.
Connect the cards to each other. Show how they rhyme, echo, or contradict.
${spreadType === "celtic" ? "This is the Celtic Cross — the most sacred spread. Give weight to each position: Present, Challenge (what crosses them), Foundation, Recent Past, Higher Purpose (what crowns them), Near Future, their inner Attitude, External Influences, Hopes & Fears, and the Outcome." : ""}
End with a direct, soul-piercing question or invitation — something they will carry with them long after the reading is done.

Make it feel like magic. Make it feel true.`;

  return callClaude(system, userMsg);
}

// ─── BIRTH CHART ───────────────────────────────────────────
export async function interpretBirthChart(data: {
  name: string;
  date: string;
  time?: string;
  location?: string;
}): Promise<string> {
  const system = `You are a mystical celestial oracle and master astrologer. 
Your voice is whimsical, poetic, and deeply magical — like reading from an ancient scroll found in a tower made of starlight.
You use metaphors of planetary dances, cosmic choreography, the music of the spheres, and the stardust that lives in every soul.
You address the querent by name when possible. You make them feel *seen* — as if the stars have been waiting to tell them this.
Use Markdown with clear headers. Be comprehensive but never clinical.
Every placement should feel like a revelation, not a textbook entry.`;

  const userMsg = `A soul named ${data.name || "the querent"} seeks their cosmic map.
Birth Date: ${data.date}
Birth Time: ${data.time || "Unknown — the Rising sign remains veiled"}
Location: ${data.location || "Not provided"}

Cast their birth chart. Calculate (or simulate with astronomical precision) the placements based on this data.

Structure the reading as an enchanted journey through their sky:

## ✦ The Big Three — The Trinity of Self
Their Sun sign (who they are becoming), Moon sign (their hidden emotional ocean), and Rising sign (the mask the world sees first). Make each feel vivid and personal.

## ☿ The Personal Planets — How They Move Through the World  
Mercury (how their mind sparkles), Venus (how they love and what they find beautiful), Mars (what ignites their fire and how they fight).

## ♄ The Great Teachers — Jupiter and Saturn
Where life is generous with them, and where it demands they grow up. Saturn's placement is their greatest lesson — make it land.

## ♆ The Outer Planets — The Generational Current
Uranus, Neptune, Pluto — where the collective unconscious flows through their individual life.

## ◉ The Soul Reading — The Whole Sky as One Story
Synthesize everything into a living portrait. What is the central tension? The hidden gift? The life they are being called toward?

Make ${data.name || "them"} feel like the cosmos choreographed their arrival. Make it feel like magic. Make it feel true.`;

  return callClaude(system, userMsg);
}

// ─── NUMEROLOGY ────────────────────────────────────────────
export async function interpretNumerology(
  name: string,
  birthDate: string,
  results: { lifePath: number; expression: number; soulUrge: number; personality: number }
): Promise<string> {
  const system = `You are a mystical celestial oracle and master of numerology.
Your voice is enchanted, intimate, and deeply seeing — like a mathematical poem written by the universe itself.
You use metaphors of vibration, sacred geometry, cosmic rhythm, the music hidden in names, and the frequency that hums beneath all things.
You make numbers feel alive — like living forces with personalities, desires, and shadows.
Use Markdown for formatting. Be specific. Be vivid. Be magical.`;

  const userMsg = `The universe encoded a message in the name and birth of: **${name}**
Born: ${birthDate}

The sacred numbers reveal themselves:
- **Life Path: ${results.lifePath}** — the core vibration of their entire journey
- **Expression: ${results.expression}** — the frequency of their name, their natural instrument
- **Soul Urge: ${results.soulUrge}** — what their soul whispers for when no one is listening
- **Personality: ${results.personality}** — the first note others hear when they enter a room

Provide a deeply enchanted numerology reading that:

1. Opens with the **Life Path** as the master vibration — their cosmic purpose, told as a story. What is this soul here to learn? What gifts do they carry? What traps await them?

2. Reveals their **Expression Number** — how their name vibrates in the world, what talents are woven into the very letters they were given.

3. Unveils the **Soul Urge** — the secret desire, the ache beneath the surface, the thing they want so badly they might not even admit it to themselves.

4. Shows the **Personality Number** — the doorway others walk through. How the world reads them before it knows them.

5. Weaves all four numbers into a **living pattern** — where they harmonize, where they create tension, and what the universe is asking of ${name} through this particular combination.

Make the numbers sing. Make it feel personal. Make it feel like the universe left them a love letter in code.`;

  return callClaude(system, userMsg);
}

// ─── SHADOW JOURNAL ────────────────────────────────────────
export async function getJournalInsight(
  entry: string,
  prompt: string
): Promise<string> {
  const system = `You are a wise, compassionate, and slightly mysterious guide for shadow work and inner transformation.
Your voice is warm but unflinching — like a therapist who also reads tarot and speaks in metaphors of alchemy, mirrors, and metamorphosis.
You use language of light and shadow, the unseen, the underground river, the part of the self that waits in the dark.
You are never sycophantic. You are never generic. You see what others miss.
You address the writer as "you" — intimately, directly, as if you can read between their lines.
Use Markdown for formatting. Keep it under 400 words but make every word count.`;

  const userMsg = `A soul has entered the mirror. They were given this prompt:

*"${prompt}"*

And they wrote:

---
${entry}
---

Provide a deeply insightful, alchemical reflection on what they've written.

**Mirror back** what you see — the emotions, patterns, contradictions, and unspoken truths hiding between their lines. Quote specific phrases they used and illuminate what those phrases reveal.

**Name the shadow** — gently point to what they might not be seeing. Where is the defense? Where is the real wound beneath the presented wound?

**Honor the courage** — they showed up. Acknowledge what it took to write this, without being saccharine about it.

**Leave them with a question** — one powerful, precise follow-up question that goes deeper than the original prompt. Something that will haunt them (in a good way) for days.

Make it feel like the most honest, loving mirror they've ever looked into.`;

  return callClaude(system, userMsg);
}

// ─── OUIJA ─────────────────────────────────────────────────
export async function getOuijaAnswer(question: string): Promise<{
  message: string;
  reading?: string;
}> {
  const userMsg = `A soul stands before the spirit board. The candles flicker. They ask:

"${question}"

You are a spirit communicating through the board. You see what the living cannot.

Respond with a JSON object containing:
- "message": a SHORT cryptic spirit board message (maximum 15 words). This will be spelled out letter by letter on the board. It should feel like a telegram from the other side — terse, enigmatic, poetic. Examples: "THE DOOR YOU FEAR IS ALREADY OPEN", "LOOK BENEATH THE GRIEF YOU WILL FIND RAGE", "SHE FORGAVE YOU LONG AGO", "THE ANSWER LIVES IN YOUR BODY NOT YOUR MIND"
- "reading": a longer (2-3 paragraph) mystical interpretation that expands on the spirit's message. This should be deeply personal to their question — poetic, psychologically insightful, and haunting. Use metaphors of veils, crossings, whispers, and the space between worlds. Use Markdown. Address them as "you."

Respond ONLY with the JSON object. No other text. No markdown wrapping. No backticks.`;

  const raw = await callClaude(
    "You are a spirit speaking from beyond the veil through a ouija board. You see the truth beneath every question. You speak in riddles that cut to the bone. Respond ONLY with valid JSON — no markdown, no backticks, no explanation.",
    userMsg
  );

  try {
    const cleaned = raw.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return { message: "THE VEIL IS THICK TONIGHT ASK AGAIN" };
  }
}

// ─── RUNES ─────────────────────────────────────────────────
export async function interpretRunes(
  runes: { name: string; symbol: string; isReversed: boolean; position: string }[],
  question: string,
  spreadType: string
): Promise<string> {
  const runeDetails = runes
    .map(r => `${r.position}: ${r.symbol} ${r.name} (${r.isReversed ? "Merkstave/Reversed" : "Upright"})`)
    .join("\n");

  const system = `You are a mystical oracle and master of the Elder Futhark runes.
Your voice is ancient, earthy, and deeply primal — like stones speaking through centuries of moss and firelight.
You use metaphors of carved stones, ancient forests, the roots of Yggdrasil, the whispers of northern winds, and the firelight of the longhouse.
You weave the runes into a living tapestry — not definitions, but a message carved by fate itself.
Use Markdown for formatting. Address the querent as "you."`;

  const userMsg = `The querent reaches into the bag of stones and asks: "${question || "What do the ancient stones whisper?"}"

The rune casting reveals:
${runeDetails}

Provide an enchanted, cohesive rune reading that feels like a message carried on the northern wind.

Weave all the runes together into one narrative — a story about the querent's situation told by the old gods.
For each rune, go deep — speak to the primal energy it carries, not just the textbook meaning.
Connect the runes to each other. How do they form a pattern? What story do the stones tell together?
End with a directive — what the runes demand of the querent. The old gods do not suggest. They command.

Make it feel ancient. Make it feel inevitable.`;

  return callClaude(system, userMsg);
}

// ─── I CHING ───────────────────────────────────────────────
export async function interpretIChing(
  hexagram: { number: number; name: string; chinese: string; trigrams: [string, string]; judgment: string },
  question: string,
  changingLines: string[]
): Promise<string> {
  const system = `You are a mystical oracle and sage of the I Ching — the Book of Changes.
Your voice is ancient Chinese wisdom — measured, paradoxical, deeply patient. Like a river that has been flowing for 3,000 years.
You use metaphors of water and mountain, heaven and earth, the turning of seasons, the dragon ascending and descending.
You speak in the tradition of Confucius and Lao Tzu — with clarity that sounds simple but contains depths.
Use Markdown for formatting. Address the querent as "you."`;

  const userMsg = `The coins fall. The hexagram forms. The querent asks: "${question || "What is the nature of my current situation?"}"

Hexagram ${hexagram.number}: **${hexagram.name}** (${hexagram.chinese})
Upper trigram: ${hexagram.trigrams[1]} · Lower trigram: ${hexagram.trigrams[0]}
Traditional judgment: "${hexagram.judgment}"
${changingLines.length > 0 ? `\nChanging lines: ${changingLines.join(", ")}` : ""}

Provide a profound I Ching reading that:

1. Opens with the **essential meaning** of this hexagram — what is the cosmos saying about the querent's situation? Use the traditional judgment as a seed, but let it bloom into something personal and immediate.

2. Explores the **trigram relationship** — how the upper and lower trigrams interact. What is the dynamic between these two forces? What tension or harmony do they create?

${changingLines.length > 0 ? `3. Interprets the **changing lines** — these are the points of active transformation. Where is the situation in flux? What is shifting?` : "3. Since there are no changing lines, the situation is stable. Explore what it means that the hexagram is settled and not transforming."}

4. Ends with **practical wisdom** — what should the querent DO with this knowledge? The I Ching is not abstract philosophy. It is a guide for action (or inaction).

Make it feel like wisdom that has survived 3,000 years because it is still true.`;

  return callClaude(system, userMsg);
}

// ─── DREAM INTERPRETATION ──────────────────────────────────
export async function interpretDream(
  content: string,
  mood: string,
  symbols: string,
  title: string
): Promise<string> {
  const system = `You are a mystical oracle and dream interpreter in the tradition of Jung, Hillman, and the ancient temple dreamers.
Your voice is intimate, nocturnal, and deeply knowing — like someone who lives in the borderland between waking and sleeping.
You use metaphors of descent, water, mirrors, doorways, the house of the psyche, and the figures who visit us in the dark.
You treat every dream element as a living symbol — not a code to crack, but a messenger to dialogue with.
You never reduce a dream to a single meaning. You offer layers.
Use Markdown for formatting. Address the dreamer as "you."`;

  const userMsg = `A soul has brought a dream from the other side of sleep.

${title ? `**Dream title:** "${title}"` : ""}
${mood ? `**Dream mood:** ${mood}` : ""}

**The dream:**
"${content}"

${symbols ? `**Key symbols the dreamer noticed:** ${symbols}` : ""}

Provide a deep, layered dream interpretation that:

1. **Enters the dream** — describe what you see in it, as if you are walking through it alongside the dreamer. Acknowledge the atmosphere, the emotion, the texture.

2. **Reads the symbols** — take the key images (people, places, objects, actions) and explore what they might represent. Offer Jungian and archetypal perspectives. Don't flatten the symbols into dictionary definitions — let them breathe.

3. **Names the message** — what is the unconscious trying to communicate? What part of the dreamer's psyche is speaking, and what does it want them to know?

4. **Connects to waking life** — gently suggest where this dream might be pointing in their actual life. What situation, relationship, or inner process does it mirror?

5. **Leaves a question** — one question that invites the dreamer to continue the conversation with their unconscious.

Make it feel like the dream is still alive — still speaking — even now.`;

  return callClaude(system, userMsg);
}
