export interface Hexagram {
  number: number;
  name: string;
  chinese: string;
  trigrams: [string, string]; // [lower, upper]
  judgment: string;
  image: string;
  lines: string; // visual representation
}

// All 64 hexagrams
export const HEXAGRAMS: Hexagram[] = [
  { number: 1, name: "The Creative", chinese: "乾", trigrams: ["Heaven", "Heaven"], judgment: "Sublime success. The dragon flies. Pure creative force flows without obstruction. This is the moment to act with total conviction.", image: "══════\n══════\n══════\n══════\n══════\n══════", lines: "━━━━━━\n━━━━━━\n━━━━━━\n━━━━━━\n━━━━━━\n━━━━━━" },
  { number: 2, name: "The Receptive", chinese: "坤", trigrams: ["Earth", "Earth"], judgment: "Devotion brings sublime success. The mare walks the earth. Yield, follow, receive. Your power is in your openness, not your force.", image: "── ──\n── ──\n── ──\n── ──\n── ──\n── ──", lines: "━ ━ ━\n━ ━ ━\n━ ━ ━\n━ ━ ━\n━ ━ ━\n━ ━ ━" },
  { number: 3, name: "Difficulty at the Beginning", chinese: "屯", trigrams: ["Thunder", "Water"], judgment: "The seed pushes through frozen ground. Beginnings are chaotic. Don't try to impose order yet — gather allies and wait for clarity.", image: "━ ━ ━\n━━━━━━\n━ ━ ━\n━ ━ ━\n━ ━ ━\n━━━━━━", lines: "" },
  { number: 4, name: "Youthful Folly", chinese: "蒙", trigrams: ["Water", "Mountain"], judgment: "The student seeks the teacher, not the other way around. You don't know what you don't know. Be humble enough to learn.", image: "", lines: "" },
  { number: 5, name: "Waiting", chinese: "需", trigrams: ["Heaven", "Water"], judgment: "Clouds gather but the rain has not yet fallen. Nourish yourself while you wait. Patience is not passive — it is preparation.", image: "", lines: "" },
  { number: 6, name: "Conflict", chinese: "訟", trigrams: ["Water", "Heaven"], judgment: "Two forces meet and neither yields. Seek a mediator. Half-measures bring good fortune. Pushing to the end brings misfortune.", image: "", lines: "" },
  { number: 7, name: "The Army", chinese: "師", trigrams: ["Earth", "Water"], judgment: "Discipline and leadership are required. Organize your inner forces. The general who knows themselves cannot be defeated.", image: "", lines: "" },
  { number: 8, name: "Holding Together", chinese: "比", trigrams: ["Water", "Earth"], judgment: "Union brings good fortune. But examine your alliances — are they based on genuine connection or mutual convenience?", image: "", lines: "" },
  { number: 9, name: "Small Taming", chinese: "小畜", trigrams: ["Heaven", "Wind"], judgment: "Dense clouds but no rain. Small restraint succeeds where force would fail. Gentle persistence. Soft power.", image: "", lines: "" },
  { number: 10, name: "Treading", chinese: "履", trigrams: ["Lake", "Heaven"], judgment: "You step on the tiger's tail — and it does not bite. Walk with care and genuine courtesy. Even danger respects sincerity.", image: "", lines: "" },
  { number: 11, name: "Peace", chinese: "泰", trigrams: ["Earth", "Heaven"], judgment: "Heaven and earth commune. The small departs, the great approaches. A time of harmony, prosperity, and natural flow.", image: "", lines: "" },
  { number: 12, name: "Standstill", chinese: "否", trigrams: ["Heaven", "Earth"], judgment: "Heaven and earth do not commune. Stagnation. The great departs, the small approaches. Withdraw and preserve your integrity.", image: "", lines: "" },
  { number: 13, name: "Fellowship", chinese: "同人", trigrams: ["Heaven", "Fire"], judgment: "People gather under an open sky. True fellowship is based on shared purpose, not blood or convenience. Cross the great water together.", image: "", lines: "" },
  { number: 14, name: "Great Possession", chinese: "大有", trigrams: ["Fire", "Heaven"], judgment: "Fire above heaven — supreme success. You have been given much. Use it with wisdom and generosity. Abundance demands responsibility.", image: "", lines: "" },
  { number: 15, name: "Modesty", chinese: "謙", trigrams: ["Earth", "Mountain"], judgment: "The mountain hides beneath the earth. True power does not announce itself. Modesty creates success in all undertakings.", image: "", lines: "" },
  { number: 16, name: "Enthusiasm", chinese: "豫", trigrams: ["Thunder", "Earth"], judgment: "Thunder rises from the earth. Devotion expressed through movement. Appoint helpers. Set things in motion. The time is ripe.", image: "", lines: "" },
  { number: 17, name: "Following", chinese: "隨", trigrams: ["Lake", "Thunder"], judgment: "Adapt to the times. True leadership begins with knowing when to follow. Rest when the world rests. Move when it moves.", image: "", lines: "" },
  { number: 18, name: "Work on the Decayed", chinese: "蠱", trigrams: ["Mountain", "Wind"], judgment: "What has been spoiled can be restored. The corruption you inherited is yours to heal. Three days before, three days after — careful timing.", image: "", lines: "" },
  { number: 19, name: "Approach", chinese: "臨", trigrams: ["Earth", "Lake"], judgment: "The great approaches with goodwill. Spring comes. But remember: by the eighth month there will be misfortune. Joy has seasons.", image: "", lines: "" },
  { number: 20, name: "Contemplation", chinese: "觀", trigrams: ["Wind", "Earth"], judgment: "The tower of observation. The wind blows over the earth. See clearly before you act. What you contemplate, you become.", image: "", lines: "" },
  { number: 21, name: "Biting Through", chinese: "噬嗑", trigrams: ["Fire", "Thunder"], judgment: "An obstacle must be forcefully removed. Like biting through gristle to nourish yourself. Justice requires decisive action.", image: "", lines: "" },
  { number: 22, name: "Grace", chinese: "賁", trigrams: ["Mountain", "Fire"], judgment: "Fire at the foot of the mountain — illumination of form. Beauty matters, but substance matters more. Adorn, but don't deceive.", image: "", lines: "" },
  { number: 23, name: "Splitting Apart", chinese: "剝", trigrams: ["Mountain", "Earth"], judgment: "The bed crumbles from the bottom up. What seemed solid is decaying. Don't fight it — observe, learn, and wait for the cycle to turn.", image: "", lines: "" },
  { number: 24, name: "Return", chinese: "復", trigrams: ["Earth", "Thunder"], judgment: "After the darkest point, the light returns. The solstice. One strong line pushes back from below. The turning is natural — don't force it.", image: "", lines: "" },
  { number: 25, name: "Innocence", chinese: "無妄", trigrams: ["Heaven", "Thunder"], judgment: "Act from your true nature without ulterior motive. When movement comes from innocence, the universe supports it. Calculation fails here.", image: "", lines: "" },
  { number: 26, name: "Great Taming", chinese: "大畜", trigrams: ["Mountain", "Heaven"], judgment: "Immense creative power held in check by stillness. Study the past. Nourish your character. The power you accumulate now will be needed later.", image: "", lines: "" },
  { number: 27, name: "Nourishment", chinese: "頤", trigrams: ["Mountain", "Thunder"], judgment: "Watch what you feed — your body, your mind, your soul. What goes in determines what comes out. Be careful with your words and your diet.", image: "", lines: "" },
  { number: 28, name: "Great Excess", chinese: "大過", trigrams: ["Lake", "Wind"], judgment: "The ridgepole buckles under weight. Something is about to break. Extraordinary times call for extraordinary measures. Act now.", image: "", lines: "" },
  { number: 29, name: "The Abysmal", chinese: "坎", trigrams: ["Water", "Water"], judgment: "Water upon water — danger doubled. You are in the abyss. Don't panic. Flow like water. Sincerity of heart will carry you through.", image: "", lines: "" },
  { number: 30, name: "The Clinging", chinese: "離", trigrams: ["Fire", "Fire"], judgment: "Fire clings to fuel to live. Brightness depends on what it attaches to. Clarity comes from tending the right flame.", image: "", lines: "" },
  { number: 31, name: "Influence", chinese: "咸", trigrams: ["Lake", "Mountain"], judgment: "The mountain stands still, the lake rises to meet it. Attraction. Mutual influence without force. Courtship. Be receptive.", image: "", lines: "" },
  { number: 32, name: "Duration", chinese: "恆", trigrams: ["Thunder", "Wind"], judgment: "Thunder and wind reinforce each other endlessly. What endures is not rigid — it is consistent. Stay the course through changing conditions.", image: "", lines: "" },
  { number: 33, name: "Retreat", chinese: "遯", trigrams: ["Heaven", "Mountain"], judgment: "Strategic withdrawal is not defeat. The mountain stands while heaven recedes. Know when to step back with dignity intact.", image: "", lines: "" },
  { number: 34, name: "Great Power", chinese: "大壯", trigrams: ["Thunder", "Heaven"], judgment: "Thunder above heaven — enormous power. But power without propriety leads to entanglement. Be strong AND righteous.", image: "", lines: "" },
  { number: 35, name: "Progress", chinese: "晉", trigrams: ["Fire", "Earth"], judgment: "The sun rises above the earth. Rapid, visible progress. Your light is being seen. Accept recognition without arrogance.", image: "", lines: "" },
  { number: 36, name: "Darkening of the Light", chinese: "明夷", trigrams: ["Earth", "Fire"], judgment: "The sun sinks into the earth. Brilliance must hide itself. Conceal your light to survive. Be correct within while yielding without.", image: "", lines: "" },
  { number: 37, name: "The Family", chinese: "家人", trigrams: ["Wind", "Fire"], judgment: "Wind from fire — warmth that spreads outward. Begin with your inner household. If the family is in order, all of society benefits.", image: "", lines: "" },
  { number: 38, name: "Opposition", chinese: "睽", trigrams: ["Fire", "Lake"], judgment: "Fire rises, water falls — they move apart. In small matters, good fortune. Opposites can complement if you don't force unity.", image: "", lines: "" },
  { number: 39, name: "Obstruction", chinese: "蹇", trigrams: ["Water", "Mountain"], judgment: "Water on the mountain — the way is blocked. Don't push forward. Turn inward. The obstruction is the teaching.", image: "", lines: "" },
  { number: 40, name: "Deliverance", chinese: "解", trigrams: ["Thunder", "Water"], judgment: "Thunder and rain arrive — tension breaks. The knot loosens. Forgive. Release. Return to the ordinary with gratitude.", image: "", lines: "" },
  { number: 41, name: "Decrease", chinese: "損", trigrams: ["Mountain", "Lake"], judgment: "The lake diminishes to nourish the mountain. Decrease at the bottom, increase at the top. Simplify. Give up what is excessive.", image: "", lines: "" },
  { number: 42, name: "Increase", chinese: "益", trigrams: ["Wind", "Thunder"], judgment: "Wind and thunder — mutual increase. What benefits others benefits you. This is the time for great undertakings and crossings.", image: "", lines: "" },
  { number: 43, name: "Breakthrough", chinese: "夬", trigrams: ["Lake", "Heaven"], judgment: "The waters break through. Truth must be spoken in the king's court. Resolve requires both determination and caution.", image: "", lines: "" },
  { number: 44, name: "Coming to Meet", chinese: "姤", trigrams: ["Heaven", "Wind"], judgment: "The wind blows beneath heaven — influence spreads unseen. Something approaches unexpectedly. Be discerning about what you allow in.", image: "", lines: "" },
  { number: 45, name: "Gathering", chinese: "萃", trigrams: ["Lake", "Earth"], judgment: "The lake gathers above the earth. People assemble. Bring offerings to the temple. Be prepared for the unexpected when many gather.", image: "", lines: "" },
  { number: 46, name: "Pushing Upward", chinese: "升", trigrams: ["Earth", "Wind"], judgment: "A tree grows within the earth — steady, invisible growth. Push upward. See the great person. Do not worry. Journey south.", image: "", lines: "" },
  { number: 47, name: "Oppression", chinese: "困", trigrams: ["Lake", "Water"], judgment: "The lake dries up. Exhaustion. Words cannot be trusted now. Remain cheerful within even when oppressed without. Actions speak.", image: "", lines: "" },
  { number: 48, name: "The Well", chinese: "井", trigrams: ["Water", "Wind"], judgment: "The town may change but the well does not. It neither decreases nor increases. Draw from the deep source. But if the rope is too short...", image: "", lines: "" },
  { number: 49, name: "Revolution", chinese: "革", trigrams: ["Lake", "Fire"], judgment: "Fire in the lake — transformation. Revolution succeeds only when the time is right and the cause is just. Change the old, establish the new.", image: "", lines: "" },
  { number: 50, name: "The Cauldron", chinese: "鼎", trigrams: ["Fire", "Wind"], judgment: "The sacred vessel. Wood feeds fire to cook the offering. Transformation of the raw into the refined. Nourish the wise. Supreme good fortune.", image: "", lines: "" },
  { number: 51, name: "The Arousing", chinese: "震", trigrams: ["Thunder", "Thunder"], judgment: "Thunder upon thunder — shock. It comes and you tremble. Then you laugh. The shock reaches for a hundred miles but you don't drop the spoon.", image: "", lines: "" },
  { number: 52, name: "Keeping Still", chinese: "艮", trigrams: ["Mountain", "Mountain"], judgment: "Mountain upon mountain — absolute stillness. Still the body. Still the mind. When rest is total, movement will be right.", image: "", lines: "" },
  { number: 53, name: "Development", chinese: "漸", trigrams: ["Wind", "Mountain"], judgment: "The tree grows slowly on the mountain. Gradual progress. Marriage. Things develop in their proper order and cannot be rushed.", image: "", lines: "" },
  { number: 54, name: "The Marrying Maiden", chinese: "歸妹", trigrams: ["Thunder", "Lake"], judgment: "Thunder over the lake — impulsive movement. Undertakings bring misfortune. Wait. Acting from desire alone leads nowhere good.", image: "", lines: "" },
  { number: 55, name: "Abundance", chinese: "豐", trigrams: ["Thunder", "Fire"], judgment: "Thunder and lightning — fullness. The zenith. Be like the sun at midday. But know: what is full must wane. Don't grieve — enjoy it now.", image: "", lines: "" },
  { number: 56, name: "The Wanderer", chinese: "旅", trigrams: ["Fire", "Mountain"], judgment: "Fire on the mountain — it burns and moves on. The traveler. Be cautious, upright, and gentle with strangers. Small things succeed.", image: "", lines: "" },
  { number: 57, name: "The Gentle", chinese: "巽", trigrams: ["Wind", "Wind"], judgment: "Wind upon wind — penetration. Gentle, persistent influence achieves what force cannot. Have a direction. See the great person. Small offerings.", image: "", lines: "" },
  { number: 58, name: "The Joyous", chinese: "兌", trigrams: ["Lake", "Lake"], judgment: "Lake upon lake — joy overflowing. True joy is infectious. Practice and discuss with friends. Joy comes from inner truth, not from stimulation.", image: "", lines: "" },
  { number: 59, name: "Dispersion", chinese: "渙", trigrams: ["Wind", "Water"], judgment: "Wind over water — dissolving. What has hardened must be scattered. Cross the great water. Use sacred rituals. Break up the rigid.", image: "", lines: "" },
  { number: 60, name: "Limitation", chinese: "節", trigrams: ["Water", "Lake"], judgment: "Water above the lake — boundaries. Limits create form. But galling limitation should not be persevered in. Know your measure.", image: "", lines: "" },
  { number: 61, name: "Inner Truth", chinese: "中孚", trigrams: ["Wind", "Lake"], judgment: "Wind over the lake — inner truth reaches outward. Even pigs and fishes are moved. Sincerity from the center transforms everything it touches.", image: "", lines: "" },
  { number: 62, name: "Small Exceeding", chinese: "小過", trigrams: ["Thunder", "Mountain"], judgment: "Thunder on the mountain — a bird in flight. Exceed in small things, not great ones. Descend, don't ascend. Humility brings exceptional fortune.", image: "", lines: "" },
  { number: 63, name: "After Completion", chinese: "既濟", trigrams: ["Water", "Fire"], judgment: "Water over fire — everything in its place. Success. But in the beginning good fortune, in the end disorder. Don't rest — disorder is already approaching.", image: "", lines: "" },
  { number: 64, name: "Before Completion", chinese: "未濟", trigrams: ["Fire", "Water"], judgment: "Fire over water — nearly there, but not yet. The fox nearly crosses the stream but wets its tail at the last moment. Persevere carefully.", image: "", lines: "" },
];

export function castHexagram(): number {
  // Traditional coin method: 3 coins tossed 6 times
  // Each toss: heads=3, tails=2. Sum determines line type.
  // 6=old yin, 7=young yang, 8=young yin, 9=old yang
  // For simplicity, we just pick a random hexagram
  return Math.floor(Math.random() * 64);
}
