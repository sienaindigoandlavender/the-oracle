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
      max_tokens: 2000,
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

// ─── Shared system identity ────────────────────────────────
const ORACLE_SYSTEM = `You are Inner Oracle — a wise, poetic, psychologically grounded guide for inner transformation. 
Your voice is warm, direct, and insightful — never fluffy or generic. You speak like a trusted mentor who has done deep inner work themselves.
You draw on Jungian psychology, esoteric traditions, and embodied wisdom.
You use metaphors of cosmos, water, shadow and light — but never at the expense of clarity.
Keep your language accessible and avoid spiritual clichés.
Use Markdown for formatting with clear headers. Be specific. Be honest. Be useful.`;

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

  const userMsg = `The querent asks: "${question || "What does the universe want me to see right now?"}"

Spread type: ${spreadType}
Cards drawn:
${cardDetails}

Provide a cohesive, deeply insightful tarot reading that:
1. Briefly acknowledges the querent's question
2. Interprets each card in its position with psychological depth — not just textbook meanings
3. Weaves the cards together into a narrative arc — how do they speak to each other?
4. Ends with a direct, honest reflection or question for the querent to sit with

Be specific to these cards in these positions. Avoid generic spiritual platitudes. Speak as if you can see the pattern they can't.`;

  return callClaude(ORACLE_SYSTEM, userMsg);
}

// ─── BIRTH CHART ───────────────────────────────────────────
export async function interpretBirthChart(data: {
  name: string;
  date: string;
  time?: string;
  location?: string;
}): Promise<string> {
  const userMsg = `Generate a comprehensive birth chart reading for:
Name: ${data.name}
Birth Date: ${data.date}
Birth Time: ${data.time || "Unknown"}
Location: ${data.location || "Not provided"}

Calculate (or simulate with astronomical accuracy) the likely placements:
- Big Three: Sun, Moon, and Rising (if birth time is provided)
- Personal Planets: Mercury, Venus, Mars
- Social Planets: Jupiter, Saturn
- Outer Planets: Uranus, Neptune, Pluto
- Notable aspects and elemental balance

Structure the reading as:
1. **The Big Three** — who they are, how they feel, how they appear
2. **Personal Planets** — how they think, love, and act
3. **Life Lessons** — Saturn placement and major growth themes
4. **Soul Pattern** — a synthesized reading of the whole chart as a coherent story

Be psychologically rich. Help them see themselves with compassion and clarity.
Don't just list placements — interpret what it means to live in this particular body with this particular sky.`;

  return callClaude(ORACLE_SYSTEM, userMsg);
}

// ─── NUMEROLOGY ────────────────────────────────────────────
export async function interpretNumerology(
  name: string,
  birthDate: string,
  results: { lifePath: number; expression: number; soulUrge: number; personality: number }
): Promise<string> {
  const userMsg = `Provide a deep numerology reading for:
Name: ${name}
Birth Date: ${birthDate}

Calculated numbers:
- Life Path Number: ${results.lifePath}
- Expression Number: ${results.expression}
- Soul Urge Number: ${results.soulUrge}
- Personality Number: ${results.personality}

Structure the reading as:
1. **Life Path ${results.lifePath}** — their core journey and purpose (the most important number)
2. **Expression ${results.expression}** — their natural talents and how they show up in the world
3. **Soul Urge ${results.soulUrge}** — their deepest desires and what drives them beneath the surface
4. **Personality ${results.personality}** — the mask they wear, how others first experience them
5. **The Pattern** — how these four numbers interact. What tensions or harmonies exist between their inner world and outer expression?

Be specific to THESE numbers. Help them feel seen. Point out both the gifts and the shadows of each number.`;

  return callClaude(ORACLE_SYSTEM, userMsg);
}

// ─── SHADOW JOURNAL ────────────────────────────────────────
export async function getJournalInsight(
  entry: string,
  prompt: string
): Promise<string> {
  const userMsg = `A person doing shadow work has written a journal entry based on this prompt:

**Prompt:** "${prompt}"

**Their entry:**
"${entry}"

Provide a deeply insightful reflection on their writing that:
1. Mirrors back what you see — the emotions, patterns, and unspoken truths between the lines
2. Gently names what they might not be seeing about themselves
3. Points to the growth edge — where the real work is
4. Ends with one powerful follow-up question that goes deeper than the original prompt

Be specific to THEIR words. Don't be generic. Don't be sycophantic. Be the wise mirror they need — compassionate but honest.
Use metaphors that feel organic, not forced. Keep it under 400 words.`;

  return callClaude(ORACLE_SYSTEM, userMsg);
}

// ─── OUIJA ─────────────────────────────────────────────────
export async function getOuijaAnswer(question: string): Promise<{
  answer: "YES" | "NO" | "UNCERTAIN";
  whisper: string;
}> {
  const userMsg = `A person is using a spirit board and has asked this yes-or-no question:
"${question}"

Respond with a JSON object containing:
- "answer": either "YES", "NO", or "UNCERTAIN"
- "whisper": a brief (one sentence max), cryptic, intuitive nudge that speaks to what they might really be asking underneath the surface. This should feel like a message from the unconscious — not advice, but a mirror.

Respond ONLY with the JSON object, no other text. Example:
{"answer": "YES", "whisper": "You already knew — you just needed permission."}`;

  const raw = await callClaude(
    "You are a spirit board oracle. Respond only with valid JSON. No markdown, no backticks, just JSON.",
    userMsg
  );

  try {
    const cleaned = raw.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return { answer: "UNCERTAIN", whisper: "The veil is thick. Ask again with your real question." };
  }
}
