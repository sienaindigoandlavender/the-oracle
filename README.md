# Inner Oracle

**Go within. Transform. Become.**

A cosmic-themed personal transformation app with AI-powered readings — Tarot, Numerology, Birth Chart, Ouija, Shadow Journal, and esoteric learning.

## Setup

```bash
npm install
```

### AI-Powered Readings (Optional)

The app works without an API key — all oracle tools use built-in static readings as a fallback. To enable **AI-powered readings** (deeply personalized, narrative interpretations):

1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
3. Add your key to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Mobile Access

Find your local IP and visit `http://YOUR_IP:3000` from your phone. Add to home screen for a full-screen app experience.

## What's Inside

| Tool | Description |
|------|-------------|
| **Tarot** | 4 spreads (Single, 3-Card, 5-Card, Celtic Cross) with AI narrative readings |
| **Numerology** | Life Path, Expression, Soul Urge, Personality numbers with AI interpretation |
| **Birth Chart** | Zodiac wheel, Big Three, planetary placements with AI deep reading |
| **Ouija** | Yes/No/Uncertain spirit board with AI-generated intuitive whispers |
| **Shadow Journal** | 35+ shadow work prompts with AI insight on your entries |
| **Learn: Tarot** | Complete 22-card Major Arcana course with symbolism and reflection questions |
| **Learn: Birth Charts** | Signs, planets, houses, elements, aspects — full astrology course |
| **Learn: Hub** | Shadow work, inner alchemy, and esoteric traditions |

## Tech

Next.js · TypeScript · Tailwind CSS · Framer Motion · Claude API (Sonnet)
