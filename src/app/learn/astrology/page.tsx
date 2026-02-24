"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper, PageHeader, CosmicDivider } from "@/components/ui";
import Link from "next/link";

// ─── SECTION DATA ──────────────────────────────────────────

interface LessonSection {
  id: string;
  title: string;
  icon: string;
  intro: string;
  items: { name: string; symbol?: string; detail: string; keywords?: string[] }[];
  practice?: string;
}

const FOUNDATIONS: { title: string; content: string }[] = [
  {
    title: "What is a Birth Chart?",
    content: "A birth chart (natal chart) is a snapshot of the sky at the exact moment and place you were born. It maps where each planet was positioned in the zodiac and in which 'house' of life it fell. Think of it as the cosmic weather report of your arrival — not a destiny sentence, but a map of your tendencies, gifts, wounds, and potential. It doesn't tell you who you must be. It shows you who you came in as.",
  },
  {
    title: "The Three Layers",
    content: "Every placement in your chart has three layers: the planet (what energy), the sign (how it expresses), and the house (where in life it plays out). For example, Venus in Scorpio in the 7th house means: love and values (Venus) expressed with intensity and depth (Scorpio) in the area of partnerships (7th house). Once you understand this formula — planet + sign + house — you can read any chart.",
  },
  {
    title: "Your Big Three",
    content: "Most people know their Sun sign, but the Big Three — Sun, Moon, and Rising — form the foundation of your chart. Your Sun is your conscious identity (who you are becoming), your Moon is your emotional inner world (who you are in private), and your Rising (Ascendant) is the mask you wear (how others first experience you). If your Sun and Moon are very different signs, you may feel an inner tension between who you appear to be and who you feel yourself to be. That tension is not a flaw — it's a feature.",
  },
  {
    title: "Why Birth Time Matters",
    content: "The Rising sign changes approximately every two hours, so even a small difference in birth time can shift your entire chart. Without a birth time, you can still read your Sun, Moon, and planetary signs — but the houses and Rising sign will be unknown. If you don't know your birth time, check your birth certificate, ask family members, or work with what you have. An imperfect chart is still revealing.",
  },
  {
    title: "How to Approach Your Chart",
    content: "Don't try to understand everything at once. Start with your Big Three. Then look at where your personal planets (Mercury, Venus, Mars) fall. Notice the elements and modalities that dominate. Over time, the chart becomes a living document — you'll return to it at different life stages and see different things. A chart read at 25 hits differently at 40.",
  },
];

const SECTIONS: LessonSection[] = [
  {
    id: "signs",
    title: "The 12 Signs",
    icon: "♈",
    intro: "Each sign is an archetype — a style of energy. When a planet sits in a sign, it expresses through that sign's qualities. No sign is better or worse. Each has a light expression and a shadow.",
    items: [
      { name: "Aries", symbol: "♈", detail: "The Initiator. Cardinal Fire. First sign of the zodiac — raw, direct, courageous. Aries energy starts things. It's the spark, the impulse, the 'I will.' Shadow: impatience, aggression, selfishness. Light: courage, honesty, pioneering spirit.", keywords: ["Cardinal", "Fire", "Mars"] },
      { name: "Taurus", symbol: "♉", detail: "The Stabilizer. Fixed Earth. Taurus builds what Aries begins. Sensual, grounded, loyal, and deeply connected to the physical world — food, touch, beauty, money. Shadow: stubbornness, possessiveness, resistance to change. Light: reliability, patience, deep appreciation for beauty.", keywords: ["Fixed", "Earth", "Venus"] },
      { name: "Gemini", symbol: "♊", detail: "The Messenger. Mutable Air. Gemini processes the world through language, curiosity, and connection. Dual-natured — not two-faced, but multifaceted. Shadow: superficiality, restlessness, inconsistency. Light: adaptability, wit, intellectual agility.", keywords: ["Mutable", "Air", "Mercury"] },
      { name: "Cancer", symbol: "♋", detail: "The Nurturer. Cardinal Water. Cancer initiates through feeling. Deeply protective, emotionally intelligent, and connected to home, family, and the past. Shadow: codependence, moodiness, emotional manipulation. Light: profound empathy, loyalty, creating safe spaces.", keywords: ["Cardinal", "Water", "Moon"] },
      { name: "Leo", symbol: "♌", detail: "The Sovereign. Fixed Fire. Leo radiates. This is the energy of self-expression, creativity, generosity, and the courage to be seen. Shadow: ego, need for validation, drama. Light: warmth, creative power, authentic self-expression.", keywords: ["Fixed", "Fire", "Sun"] },
      { name: "Virgo", symbol: "♍", detail: "The Analyst. Mutable Earth. Virgo refines, heals, and serves. This energy notices what others miss — patterns, flaws, opportunities for improvement. Shadow: perfectionism, criticism (of self and others), anxiety. Light: devotion, precision, genuine service.", keywords: ["Mutable", "Earth", "Mercury"] },
      { name: "Libra", symbol: "♎", detail: "The Harmonizer. Cardinal Air. Libra initiates through relationship. This energy seeks balance, beauty, justice, and the space where two perspectives meet. Shadow: people-pleasing, indecision, avoiding conflict. Light: diplomacy, aesthetic sense, fairness.", keywords: ["Cardinal", "Air", "Venus"] },
      { name: "Scorpio", symbol: "♏", detail: "The Alchemist. Fixed Water. Scorpio goes where others won't — into the depths, the taboo, the hidden truth. This is the energy of transformation through intensity. Shadow: control, jealousy, destructive behavior. Light: emotional depth, transformative power, loyalty unto death.", keywords: ["Fixed", "Water", "Pluto"] },
      { name: "Sagittarius", symbol: "♐", detail: "The Seeker. Mutable Fire. Sagittarius hunts for meaning — through travel, philosophy, adventure, and the big questions. Shadow: recklessness, preachiness, commitment-phobia. Light: optimism, wisdom, expansive vision.", keywords: ["Mutable", "Fire", "Jupiter"] },
      { name: "Capricorn", symbol: "♑", detail: "The Builder. Cardinal Earth. Capricorn initiates through structure. This is long-term ambition, discipline, and the willingness to climb the mountain however long it takes. Shadow: coldness, workaholism, status obsession. Light: integrity, mastery, endurance.", keywords: ["Cardinal", "Earth", "Saturn"] },
      { name: "Aquarius", symbol: "♒", detail: "The Visionary. Fixed Air. Aquarius sees the future — systems, communities, ideas that don't exist yet. This is the energy of revolution and collective progress. Shadow: emotional detachment, contrarianism, alienation. Light: originality, humanitarianism, intellectual freedom.", keywords: ["Fixed", "Air", "Uranus"] },
      { name: "Pisces", symbol: "♓", detail: "The Mystic. Mutable Water. The final sign — Pisces dissolves boundaries between self and other, dream and reality, human and divine. Shadow: escapism, victimhood, boundary dissolution. Light: compassion, artistic genius, spiritual connection.", keywords: ["Mutable", "Water", "Neptune"] },
    ],
    practice: "Look up your Moon sign. Read its description. Does it resonate with how you feel in private, when no one is performing? The Moon sign often feels more accurate than the Sun sign because it describes your emotional core.",
  },
  {
    id: "planets",
    title: "The Planets",
    icon: "☿",
    intro: "Planets represent different drives and energies within you. The 'personal planets' (Sun through Mars) describe your day-to-day personality. The 'social planets' (Jupiter, Saturn) describe how you relate to society. The 'transpersonal planets' (Uranus, Neptune, Pluto) describe generational themes that play out personally through the house they occupy.",
    items: [
      { name: "The Sun ☀", detail: "Your core identity. What you are growing into. The Sun isn't who you are at birth — it's who you're becoming through conscious effort. It represents your ego, your vitality, and the qualities you must develop to feel alive. Ask: what makes me feel most like myself?", keywords: ["Identity", "Purpose", "Vitality"] },
      { name: "The Moon ☽", detail: "Your emotional body. Your needs. How you were nurtured (or not) as a child. The Moon describes what makes you feel safe, how you process feelings, and what you need to feel at home in your own skin. Your Moon sign is your private self — the one that emerges when you're tired or vulnerable.", keywords: ["Emotions", "Needs", "Inner world"] },
      { name: "Mercury ☿", detail: "Your mind. How you think, communicate, learn, and process information. Mercury in a fire sign communicates with passion and directness. Mercury in a water sign communicates through emotion and intuition. This planet shapes how you make sense of reality.", keywords: ["Communication", "Thinking", "Learning"] },
      { name: "Venus ♀", detail: "What you love and how you love. Venus governs attraction, aesthetics, values, and pleasure. It describes what you find beautiful, how you relate in partnerships, and your relationship with money and material comfort. Venus shows what you attract and what you're attracted to.", keywords: ["Love", "Beauty", "Values"] },
      { name: "Mars ♂", detail: "Your drive. How you assert yourself, pursue what you want, and handle conflict. Mars is your anger style, your ambition, and your sexual energy. A person with Mars in Libra fights differently than one with Mars in Aries. Neither is wrong — they're different strategies.", keywords: ["Action", "Desire", "Conflict"] },
      { name: "Jupiter ♃", detail: "Where you expand. Jupiter is the principle of growth, luck, abundance, and wisdom. The house and sign of your Jupiter show where life tends to be generous with you — and where you might over-indulge. Jupiter asks: where is my abundance, and am I sharing it?", keywords: ["Growth", "Abundance", "Wisdom"] },
      { name: "Saturn ♄", detail: "Where you must mature. Saturn is the great teacher — its placement shows where you'll face your hardest lessons, your deepest fears, and your greatest potential for mastery. Saturn returns (around ages 29 and 58) mark major life reckonings. Saturn's house is where life demands you grow up.", keywords: ["Discipline", "Limitation", "Mastery"] },
      { name: "Uranus ♅", detail: "Where you break free. Uranus represents sudden change, rebellion, innovation, and the refusal to conform. Its house shows where your life will be most unpredictable and where you'll be called to do things differently than expected.", keywords: ["Revolution", "Awakening", "Freedom"] },
      { name: "Neptune ♆", detail: "Where you dissolve. Neptune governs dreams, spirituality, illusion, and the desire to merge with something greater. Its house shows where you may experience confusion, artistic inspiration, or spiritual longing — and where you're most susceptible to escapism.", keywords: ["Dreams", "Spirituality", "Illusion"] },
      { name: "Pluto ♇", detail: "Where you transform. Pluto is the planet of death and rebirth, power and shadow. Its house shows where you'll experience the deepest transformations — and where you may encounter issues of control, obsession, or buried pain that demands excavation.", keywords: ["Transformation", "Power", "Shadow"] },
    ],
    practice: "Find where Saturn sits in your chart. This is your area of greatest challenge and greatest potential mastery. What has been hardest for you in this area of life? That struggle is Saturn's teaching.",
  },
  {
    id: "houses",
    title: "The 12 Houses",
    icon: "⌂",
    intro: "If signs are how energy expresses and planets are what energy, houses are where it plays out in your life. The houses divide your chart into 12 areas of lived experience. A planet in a house brings that planet's energy into that life domain.",
    items: [
      { name: "1st House — Self", detail: "Your identity, physical body, appearance, and how you meet the world. The sign on this house cusp is your Rising sign. Planets here strongly influence your personality and how others perceive you on first meeting." },
      { name: "2nd House — Resources", detail: "Money, possessions, self-worth, and what you value. This house isn't just about bank accounts — it's about your relationship with material security and what you believe you deserve." },
      { name: "3rd House — Communication", detail: "Daily communication, siblings, short trips, learning style, and the mind's everyday operations. How you speak, write, and process your immediate environment." },
      { name: "4th House — Roots", detail: "Home, family, ancestry, emotional foundation. The IC (bottom of the chart). This is your private inner world — where you come from, what 'home' means to you, and your relationship with your parents and lineage." },
      { name: "5th House — Creation", detail: "Creativity, romance, pleasure, children, self-expression, and play. This is the house of joy — what you create for the sheer delight of it, how you flirt, and what makes you feel alive." },
      { name: "6th House — Service", detail: "Daily routines, health, work habits, and service to others. This is the house of refinement — how you maintain your body, structure your days, and contribute through practical effort." },
      { name: "7th House — Partnership", detail: "Committed relationships, business partners, open enemies, and the mirror of the self. The Descendant. This house shows what you attract in others — often the qualities you haven't integrated in yourself." },
      { name: "8th House — Transformation", detail: "Shared resources, intimacy, death, rebirth, the occult, and other people's money. The deep house. This is where you merge with others and where you confront the parts of life that can't be controlled." },
      { name: "9th House — Expansion", detail: "Philosophy, higher education, travel, spirituality, and the search for meaning. This house asks: what do you believe? And is that belief truly yours, or inherited?" },
      { name: "10th House — Legacy", detail: "Career, public reputation, achievement, and your role in the world. The MC (top of the chart). This is what you're building in the eyes of the world — your vocation, not just your job." },
      { name: "11th House — Community", detail: "Friendships, groups, social causes, hopes, and dreams for the future. This house is about belonging — not to a family (4th house) but to a tribe, a movement, a collective purpose." },
      { name: "12th House — The Unseen", detail: "The subconscious, hidden enemies, self-undoing, isolation, spirituality, and everything that operates below the surface. The most mysterious house. Planets here often work in ways you can't see until you do deep inner work." },
    ],
    practice: "Find which houses hold the most planets in your chart. These are the areas of life with the most activity and complexity. Empty houses aren't empty — they're simply quieter.",
  },
  {
    id: "elements",
    title: "Elements & Modalities",
    icon: "△",
    intro: "Every sign belongs to an element (its nature) and a modality (its mode of action). Understanding these gives you a quick way to read the overall energy balance of any chart.",
    items: [
      { name: "Fire Signs (Aries, Leo, Sagittarius)", detail: "Spirit, will, action, inspiration. Fire is the initiating force. People heavy in fire are passionate, direct, and energetic — but may burn themselves or others out. Fire needs something to burn for.", keywords: ["Spirit", "Will", "Action"] },
      { name: "Earth Signs (Taurus, Virgo, Capricorn)", detail: "Body, matter, structure, endurance. Earth is the building force. People heavy in earth are practical, reliable, and grounded — but may resist change or over-identify with material security.", keywords: ["Body", "Structure", "Endurance"] },
      { name: "Air Signs (Gemini, Libra, Aquarius)", detail: "Mind, communication, connection, ideas. Air is the thinking force. People heavy in air are social, intellectual, and objective — but may intellectualize feelings or become detached from their bodies.", keywords: ["Mind", "Connection", "Ideas"] },
      { name: "Water Signs (Cancer, Scorpio, Pisces)", detail: "Emotion, intuition, the subconscious, empathy. Water is the feeling force. People heavy in water are deeply intuitive and emotionally intelligent — but may be overwhelmed by feelings or lose themselves in others.", keywords: ["Emotion", "Intuition", "Depth"] },
      { name: "Cardinal Signs (Aries, Cancer, Libra, Capricorn)", detail: "Initiators. Cardinal signs start things. They're the leaders, the catalysts, the ones who say 'let's begin.' Heavy cardinal energy means you're a natural starter — but may struggle with follow-through.", keywords: ["Initiative", "Leadership"] },
      { name: "Fixed Signs (Taurus, Leo, Scorpio, Aquarius)", detail: "Sustainers. Fixed signs maintain and deepen. They're loyal, persistent, and powerful — but may resist necessary change. Heavy fixed energy means you're a builder — but may need to learn when to let go.", keywords: ["Persistence", "Depth"] },
      { name: "Mutable Signs (Gemini, Virgo, Sagittarius, Pisces)", detail: "Adapters. Mutable signs are flexible, versatile, and responsive to change. They complete cycles and transition between seasons. Heavy mutable energy means you're adaptable — but may lack the stability to follow through.", keywords: ["Flexibility", "Adaptation"] },
    ],
    practice: "Count how many planets you have in each element. If you're heavy in one element and light in another, notice how that imbalance shows up in your life. Someone with no water placements may struggle to access emotions. Someone with no earth may struggle with practical follow-through.",
  },
  {
    id: "aspects",
    title: "Aspects (Planetary Relationships)",
    icon: "⚹",
    intro: "Aspects are the angles between planets in your chart. They describe how different parts of your psyche communicate — harmoniously, tensely, or not at all. Major aspects to look for:",
    items: [
      { name: "Conjunction (0°)", detail: "Two planets in the same place — their energies merge. This is the most powerful aspect. The planets amplify each other, for better or worse. Sun conjunct Mars: identity and drive are inseparable. Moon conjunct Neptune: emotions and dreams are blended.", keywords: ["Fusion", "Amplification"] },
      { name: "Opposition (180°)", detail: "Two planets directly across from each other — they pull in opposite directions. This creates tension, but also awareness. Oppositions force you to integrate two competing needs. Sun opposite Moon: your identity and emotions may feel at odds.", keywords: ["Tension", "Balance", "Awareness"] },
      { name: "Trine (120°)", detail: "Planets in the same element — energy flows easily between them. Trines are gifts: natural talents that come without effort. But be careful — what comes easy can be taken for granted. Venus trine Jupiter: love and abundance flow naturally.", keywords: ["Flow", "Ease", "Natural talent"] },
      { name: "Square (90°)", detail: "Planets at right angles — this creates friction, challenge, and growth. Squares are the muscle-builders of the chart. They force you to work for what you want. Sun square Saturn: identity must be earned through discipline and difficulty.", keywords: ["Challenge", "Growth", "Friction"] },
      { name: "Sextile (60°)", detail: "Planets two signs apart — a gentle, supportive connection. Sextiles offer opportunities, but unlike trines, you have to act on them. They're invitations, not guarantees.", keywords: ["Opportunity", "Support"] },
    ],
    practice: "Look for any squares in your chart — these are your growth edges. The tension of a square is where you'll be challenged most, but also where you'll develop your greatest strength. Squares are not problems to solve. They're tensions to hold.",
  },
  {
    id: "reading",
    title: "Putting It All Together",
    icon: "◉",
    intro: "Reading a chart is like learning a language — start with the basics and add complexity over time. Here's a progressive approach:",
    items: [
      { name: "Step 1: The Big Three", detail: "Read your Sun sign (identity), Moon sign (inner world), and Rising sign (outer persona). Just these three give you a profound starting point. Notice the elements: are they all different? That creates internal diversity. Are two the same? That energy dominates." },
      { name: "Step 2: Personal Planets", detail: "Find Mercury (how you think), Venus (how you love), and Mars (how you act). Read the sign each is in. This gives you a picture of your communication style, relationship patterns, and drive." },
      { name: "Step 3: Saturn's Placement", detail: "Find Saturn. What sign is it in? What house? This is your life's great teacher — the area where you'll be tested, humbled, and ultimately mastered. Saturn's lessons are slow but permanent." },
      { name: "Step 4: Elemental Balance", detail: "Count how many planets sit in fire, earth, air, and water signs. Note which element dominates and which is missing. This tells you your natural strengths and your blind spots." },
      { name: "Step 5: House Emphasis", detail: "Where are most of your planets clustered? A chart with many planets in the 10th house is career-focused. Many planets in the 4th house means home and family are central. The busiest houses are where life is most complex." },
      { name: "Step 6: Major Aspects", detail: "Look for conjunctions, squares, and oppositions between your personal planets. These are the central dynamics of your personality — the inner conversations that shape your experience." },
      { name: "Step 7: Live With It", detail: "A birth chart isn't read once. It's a living document. Come back to it when you're going through a transition. You'll see things you missed before. The chart doesn't change — you do." },
    ],
    practice: "Generate your chart in this app's Birth Chart tool. Write down your Big Three. Then add Mercury, Venus, and Mars. Just six placements. Sit with them for a week before going deeper.",
  },
];

// ─── COMPONENT ─────────────────────────────────────────────
export default function LearnAstrologyPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>("signs");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <PageWrapper>
      <PageHeader icon="☿" title="Learn Birth Charts" subtitle="How to read the cosmic map of who you are" />
      <CosmicDivider />

      <div className="mb-6">
        <Link href="/learn" className="text-xs tracking-[1px] uppercase transition-colors" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-muted)" }}>
          ← Back to Learn
        </Link>
      </div>

      {/* Foundations */}
      <h3 className="text-xs tracking-[2px] uppercase mb-4" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>
        Foundations
      </h3>
      <div className="space-y-3 mb-8">
        {FOUNDATIONS.map((f, i) => (
          <div key={i} className="glass p-5">
            <h4 className="text-sm tracking-wide mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-primary)" }}>{f.title}</h4>
            <p className="text-sm leading-[1.8]" style={{ color: "var(--text-secondary)" }}>{f.content}</p>
          </div>
        ))}
      </div>

      <CosmicDivider />

      {/* Deep dive sections */}
      <div className="space-y-3">
        {SECTIONS.map(section => {
          const isOpen = expandedSection === section.id;
          return (
            <div key={section.id} className="glass overflow-hidden">
              <button
                onClick={() => setExpandedSection(isOpen ? null : section.id)}
                className="w-full text-left p-5 flex items-start gap-3"
              >
                <span className="text-lg" style={{ color: "var(--text-accent)" }}>{section.icon}</span>
                <div className="flex-1">
                  <div className="text-sm tracking-wide" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-primary)" }}>{section.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{section.items.length} topics</div>
                </div>
                <span className="text-sm transition-transform duration-300" style={{ color: "var(--text-muted)", transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}>›</span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-5 pb-5">
                      <div className="h-px mb-4" style={{ background: "var(--border-subtle)" }} />
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{section.intro}</p>

                      <div className="space-y-2">
                        {section.items.map((item) => {
                          const itemOpen = expandedItem === `${section.id}-${item.name}`;
                          return (
                            <div key={item.name}>
                              <button
                                onClick={() => setExpandedItem(itemOpen ? null : `${section.id}-${item.name}`)}
                                className="w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all duration-200"
                                style={{
                                  background: itemOpen ? "rgba(212,165,74,0.06)" : "rgba(12,18,37,0.4)",
                                  border: `1px solid ${itemOpen ? "rgba(212,165,74,0.12)" : "transparent"}`,
                                }}
                              >
                                {item.symbol && <span className="text-base">{item.symbol}</span>}
                                <span className="text-sm flex-1" style={{ color: itemOpen ? "var(--text-accent)" : "var(--text-primary)" }}>{item.name}</span>
                                <span className="text-xs transition-transform duration-200" style={{ color: "var(--text-muted)", transform: itemOpen ? "rotate(90deg)" : "rotate(0)" }}>›</span>
                              </button>

                              <AnimatePresence>
                                {itemOpen && (
                                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                    <div className="p-3 pl-6">
                                      {item.keywords && (
                                        <div className="flex flex-wrap gap-1.5 mb-2">
                                          {item.keywords.map(k => (
                                            <span key={k} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(212,165,74,0.06)", color: "var(--text-muted)", border: "1px solid rgba(212,165,74,0.1)" }}>{k}</span>
                                          ))}
                                        </div>
                                      )}
                                      <p className="text-sm leading-[1.8]" style={{ color: "var(--text-secondary)" }}>{item.detail}</p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>

                      {section.practice && (
                        <div className="mt-4 p-4 rounded-lg" style={{ background: "rgba(212,165,74,0.04)", border: "1px solid rgba(212,165,74,0.08)" }}>
                          <div className="text-[10px] tracking-[2px] uppercase mb-2" style={{ fontFamily: "'Philosopher', serif", color: "var(--text-accent)" }}>Practice</div>
                          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{section.practice}</p>
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
