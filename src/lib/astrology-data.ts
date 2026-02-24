export interface ZodiacSign {
  name: string;
  symbol: string;
  element: string;
  dates: string;
  ruler: string;
  trait: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: "Aries", symbol: "♈", element: "Fire", dates: "Mar 21 – Apr 19", ruler: "Mars", trait: "Bold, ambitious, pioneering" },
  { name: "Taurus", symbol: "♉", element: "Earth", dates: "Apr 20 – May 20", ruler: "Venus", trait: "Reliable, patient, devoted" },
  { name: "Gemini", symbol: "♊", element: "Air", dates: "May 21 – Jun 20", ruler: "Mercury", trait: "Curious, adaptable, communicative" },
  { name: "Cancer", symbol: "♋", element: "Water", dates: "Jun 21 – Jul 22", ruler: "Moon", trait: "Intuitive, sentimental, protective" },
  { name: "Leo", symbol: "♌", element: "Fire", dates: "Jul 23 – Aug 22", ruler: "Sun", trait: "Creative, passionate, generous" },
  { name: "Virgo", symbol: "♍", element: "Earth", dates: "Aug 23 – Sep 22", ruler: "Mercury", trait: "Analytical, practical, diligent" },
  { name: "Libra", symbol: "♎", element: "Air", dates: "Sep 23 – Oct 22", ruler: "Venus", trait: "Diplomatic, gracious, fair-minded" },
  { name: "Scorpio", symbol: "♏", element: "Water", dates: "Oct 23 – Nov 21", ruler: "Pluto", trait: "Resourceful, passionate, determined" },
  { name: "Sagittarius", symbol: "♐", element: "Fire", dates: "Nov 22 – Dec 21", ruler: "Jupiter", trait: "Optimistic, adventurous, philosophical" },
  { name: "Capricorn", symbol: "♑", element: "Earth", dates: "Dec 22 – Jan 19", ruler: "Saturn", trait: "Disciplined, responsible, ambitious" },
  { name: "Aquarius", symbol: "♒", element: "Air", dates: "Jan 20 – Feb 18", ruler: "Uranus", trait: "Progressive, original, humanitarian" },
  { name: "Pisces", symbol: "♓", element: "Water", dates: "Feb 19 – Mar 20", ruler: "Neptune", trait: "Compassionate, intuitive, artistic" },
];

export const PLANETS = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
export const HOUSES = ["Identity", "Possessions", "Communication", "Home", "Pleasure", "Health", "Partnerships", "Transformation", "Philosophy", "Career", "Community", "Subconscious"];
