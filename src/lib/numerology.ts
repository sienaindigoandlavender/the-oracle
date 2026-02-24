const letterValues: Record<string, number> = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
  j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
  s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8
};

const vowels = "aeiou";

function reduceToSingle(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").reduce((a, b) => a + parseInt(b), 0);
  }
  return n;
}

export function calcLifePath(date: string): number {
  const digits = date.replace(/-/g, "").split("").reduce((a, b) => a + parseInt(b), 0);
  return reduceToSingle(digits);
}

export function calcExpression(name: string): number {
  const sum = name.toLowerCase().replace(/[^a-z]/g, "").split("").reduce((a, c) => a + (letterValues[c] || 0), 0);
  return reduceToSingle(sum);
}

export function calcSoulUrge(name: string): number {
  const sum = name.toLowerCase().replace(/[^a-z]/g, "").split("").filter(c => vowels.includes(c)).reduce((a, c) => a + (letterValues[c] || 0), 0);
  return reduceToSingle(sum);
}

export function calcPersonality(name: string): number {
  const sum = name.toLowerCase().replace(/[^a-z]/g, "").split("").filter(c => !vowels.includes(c)).reduce((a, c) => a + (letterValues[c] || 0), 0);
  return reduceToSingle(sum);
}

export interface NumberMeaning {
  title: string;
  desc: string;
}

export const numberMeanings: Record<number, NumberMeaning> = {
  1: { title: "The Leader", desc: "Independent, pioneering, driven. You forge your own path and inspire others to follow." },
  2: { title: "The Peacemaker", desc: "Diplomatic, intuitive, cooperative. You bring harmony and understanding to all around you." },
  3: { title: "The Creator", desc: "Expressive, artistic, joyful. You are a vessel for creative energy and inspire wonder." },
  4: { title: "The Builder", desc: "Practical, disciplined, loyal. You create lasting foundations and structures of meaning." },
  5: { title: "The Adventurer", desc: "Free-spirited, adaptable, curious. You embrace change and thrive in new experiences." },
  6: { title: "The Nurturer", desc: "Responsible, loving, protective. You carry the weight of care for those you love." },
  7: { title: "The Seeker", desc: "Analytical, spiritual, introspective. You seek truth beneath the surface of all things." },
  8: { title: "The Powerhouse", desc: "Ambitious, authoritative, material. You command resources and manifest abundance." },
  9: { title: "The Humanitarian", desc: "Compassionate, wise, selfless. You serve the greater good with grace and wisdom." },
  11: { title: "The Master Intuitive", desc: "Visionary, enlightened, inspiring. A master number — you channel higher wisdom." },
  22: { title: "The Master Builder", desc: "Architect of dreams, powerful, practical visionary. You build empires from nothing." },
  33: { title: "The Master Teacher", desc: "Altruistic, spiritual teacher, healer. The rarest vibration — pure compassion." },
};
