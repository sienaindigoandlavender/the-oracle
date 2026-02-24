"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";

interface Topic {
  title: string;
  icon: string;
  summary: string;
  content: string[];
  practices?: string[];
}

const TOPICS: Topic[] = [
  {
    title: "Shadow Work",
    icon: "◑",
    summary: "Meeting the hidden self — the parts of you that were exiled.",
    content: [
      "Shadow work is a concept from Jungian psychology. Carl Jung described the 'shadow' as the parts of ourselves we repress, deny, or disown — often because they were punished or shamed in childhood.",
      "The shadow is not inherently dark or evil. It contains rejected qualities that may be powerful, creative, or deeply authentic. A child told 'don't be so loud' represses their expressiveness. A person shamed for anger buries their capacity for healthy boundaries.",
      "Shadow work is the practice of re-integrating these exiled parts. When we own our shadow, we stop projecting it onto others. We become more whole, more honest, and more free.",
      "The shadow reveals itself through triggers, projections, dreams, and the qualities we judge most harshly in others. If something deeply bothers you about another person, ask: where does this quality live in me?",
    ],
    practices: [
      "Journaling with shadow prompts (use this app's Shadow Journal)",
      "Noticing your emotional triggers and asking 'what is this really about?'",
      "Writing letters to your younger self",
      "Active imagination — dialoguing with the shadow in writing",
      "Mirror work — speaking difficult truths to your own reflection",
    ],
  },
  {
    title: "Tarot as a Mirror",
    icon: "✦",
    summary: "Not fortune-telling — a symbolic language for self-knowledge.",
    content: [
      "Tarot originated as a card game in 15th-century Italy. It was not widely used for divination until the 18th century, when occultists began mapping its imagery to Kabbalistic, astrological, and alchemical systems.",
      "The Major Arcana (22 cards) represents the soul's journey — from The Fool's innocent beginning through Death's transformation to The World's integration. This is sometimes called 'The Fool's Journey.'",
      "Modern psychological tarot treats the cards not as predictive tools but as mirrors. Each card is an archetype — a pattern of human experience that you can use to reflect on your own inner landscape.",
      "When you draw a card, you are not receiving a prophecy. You are meeting an aspect of your psyche. The meaning you find is the meaning that was already waiting inside you.",
    ],
    practices: [
      "Draw a daily single card and journal about what it reflects in your life",
      "Use the three-card spread: what am I leaving, where am I now, what am I moving toward",
      "Study the symbolism of each card — colors, numbers, figures, elements",
      "Practice reading for yourself without books — trust your intuitive response first",
    ],
  },
  {
    title: "Numerology",
    icon: "◈",
    summary: "The vibrational language of numbers and names.",
    content: [
      "Numerology is the study of the mystical significance of numbers. Its roots appear in ancient Babylonian, Egyptian, Greek, and Chinese traditions. Pythagoras believed that number is the principle of all things.",
      "In modern numerology, your Life Path Number (derived from your birth date) is considered the most important number. It reveals your core purpose and the energetic frequency you carry through life.",
      "Your Expression Number (from your full birth name) reveals your natural talents and the tools you have for fulfilling your life path. Your Soul Urge Number (from the vowels in your name) reveals your deepest desires.",
      "Master numbers (11, 22, 33) carry intensified energy and are not reduced to single digits. They represent heightened spiritual potential and greater challenges.",
    ],
    practices: [
      "Calculate your core numbers using this app's Numerology tool",
      "Notice repeating numbers in your daily life (11:11, 222, 333)",
      "Study the qualities of your Life Path number — does it resonate?",
      "Research the numerological meaning of significant dates in your life",
    ],
  },
  {
    title: "Astrology Basics",
    icon: "☿",
    summary: "You are not just your sun sign. You are the whole sky.",
    content: [
      "Western astrology maps the positions of celestial bodies at the moment of your birth to create a natal chart — a symbolic blueprint of your psyche, patterns, and potential.",
      "Your 'Big Three' — Sun, Moon, and Rising signs — form the foundation. Your Sun sign is your core identity, your Moon sign is your emotional inner world, and your Rising sign is the mask you present to the world.",
      "Beyond the Big Three, each planet in your chart sits in a sign and a house, creating a complex web of energies. Mercury governs communication, Venus governs love and values, Mars governs action and drive.",
      "Astrology is not deterministic. Your chart shows tendencies, not fate. It is a map, not the territory. The most powerful use of astrology is self-understanding — seeing your patterns with compassion rather than judgment.",
    ],
    practices: [
      "Generate your birth chart with this app (you'll need your birth time for Rising)",
      "Read about your Moon sign — it often resonates more deeply than your Sun sign",
      "Notice how the current lunar phase affects your energy and emotions",
      "Study planetary transits to understand collective energies",
    ],
  },
  {
    title: "The Ouija & Intuition",
    icon: "◎",
    summary: "The board doesn't speak — your unconscious does.",
    content: [
      "The ouija board, or spirit board, was popularized in the 1890s as a parlor game. It gained its occult reputation through cultural storytelling rather than historical tradition.",
      "From a psychological perspective, the ouija board works through the ideomotor effect — unconscious muscle movements that guide the planchette. Your conscious mind says 'I'm not moving it,' but your deeper mind knows the answer.",
      "This is actually more powerful than spirit communication. When you ask the board a yes-or-no question, you are bypassing your rational mind and accessing what you already know beneath your defenses.",
      "The question matters more than the answer. If you feel relief at 'yes' or tension at 'no,' that response is the real oracle — it reveals what you were hoping for all along.",
    ],
    practices: [
      "Use the Ouija tool for genuine yes/no questions you're struggling with",
      "Pay attention to your body's response to the answer — that's the real information",
      "Practice asking yourself hard questions before reaching for external validation",
      "Notice the difference between what your mind wants and what your body knows",
    ],
  },
  {
    title: "Inner Alchemy",
    icon: "⟳",
    summary: "The art of transmuting who you were into who you are becoming.",
    content: [
      "Alchemy — the medieval precursor to chemistry — was never really about turning lead into gold. The esoteric tradition understood this as metaphor: transforming the 'lead' of the unconscious, unexamined self into the 'gold' of an integrated, awakened being.",
      "The alchemical process has stages: Nigredo (blackening) is the dissolution of the old self — crisis, depression, loss of identity. Albedo (whitening) is purification — gaining clarity after the darkness. Rubedo (reddening) is the integration — becoming whole.",
      "Every period of deep transformation follows this pattern. You are not broken when you are in the Nigredo. You are being remade.",
      "Inner alchemy asks: what am I being asked to release? What is emerging? Can I trust the process even when it feels like destruction?",
    ],
    practices: [
      "Identify which alchemical stage you are currently in",
      "Journal about what is dissolving in your life and what is forming",
      "Study the symbolism of the four elements: fire (will), water (emotion), air (mind), earth (body)",
      "Practice the art of sitting with discomfort without trying to fix it",
    ],
  },
];

export default function LearnPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <PageWrapper>
      <PageHeader icon="❋" title="Learn" subtitle="Esoteric wisdom for the inner journey" />
      <CosmicDivider />

      <p className="text-sm text-center leading-relaxed mb-8 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
        These are starting points, not doctrines. Take what resonates.
        Question everything — including what you read here.
      </p>

      {/* Deep Dive Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <Link href="/learn/tarot" className="oracle-card p-5 block transition-transform active:scale-[0.98]" style={{ background: "linear-gradient(145deg, rgba(212,165,74,0.08), rgba(12,18,37,0.6))" }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">✦</span>
            <div>
              <div className="text-sm tracking-wide mb-1" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
                Learn to Read Tarot
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Complete guide to all 22 Major Arcana — symbolism, meanings, reversals, and reflection questions.
              </p>
              <span className="text-[10px] tracking-[1px] uppercase mt-2 inline-block" style={{ color: "var(--text-muted)" }}>22 cards · Full course →</span>
            </div>
          </div>
        </Link>
        <Link href="/learn/astrology" className="oracle-card p-5 block transition-transform active:scale-[0.98]" style={{ background: "linear-gradient(145deg, rgba(42,74,122,0.12), rgba(12,18,37,0.6))" }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">☿</span>
            <div>
              <div className="text-sm tracking-wide mb-1" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
                Learn to Read Birth Charts
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Signs, planets, houses, elements, aspects — how to decode the cosmic map of who you are.
              </p>
              <span className="text-[10px] tracking-[1px] uppercase mt-2 inline-block" style={{ color: "var(--text-muted)" }}>6 modules · Full course →</span>
            </div>
          </div>
        </Link>
      </div>

      <CosmicDivider />

      <div className="space-y-3">
        {TOPICS.map((topic) => {
          const isOpen = expanded === topic.title;
          return (
            <div key={topic.title} className="glass overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : topic.title)}
                className="w-full text-left p-5 flex items-start gap-4 transition-colors"
              >
                <span className="text-xl mt-0.5" style={{ color: "var(--text-accent)" }}>{topic.icon}</span>
                <div className="flex-1">
                  <div className="text-base mb-0.5" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-primary)" }}>
                    {topic.title}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {topic.summary}
                  </div>
                </div>
                <span
                  className="text-sm mt-1 transition-transform duration-300"
                  style={{ color: "var(--text-muted)", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  ›
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="h-px mb-4" style={{ background: "var(--border-subtle)" }} />

                      {topic.content.map((para, i) => (
                        <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                          {para}
                        </p>
                      ))}

                      {topic.practices && (
                        <div className="mt-4 p-4 rounded-lg" style={{ background: "rgba(212,165,74,0.04)", border: "1px solid rgba(212,165,74,0.08)" }}>
                          <div className="text-[10px] tracking-[2px] uppercase mb-3" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
                            Practices
                          </div>
                          {topic.practices.map((practice, i) => (
                            <div key={i} className="flex gap-2 mb-2 last:mb-0">
                              <span className="text-xs mt-0.5" style={{ color: "var(--text-accent)" }}>·</span>
                              <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{practice}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
