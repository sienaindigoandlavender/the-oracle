import { NextRequest, NextResponse } from "next/server";
import {
  interpretTarot,
  interpretBirthChart,
  interpretNumerology,
  getJournalInsight,
  getOuijaAnswer,
  interpretRunes,
  interpretIChing,
  interpretDream,
} from "@/lib/oracle-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    let result: unknown;

    switch (type) {
      case "tarot":
        result = await interpretTarot(body.cards, body.question, body.spreadType);
        break;
      case "birthchart":
        result = await interpretBirthChart(body.data);
        break;
      case "numerology":
        result = await interpretNumerology(body.name, body.birthDate, body.results);
        break;
      case "journal":
        result = await getJournalInsight(body.entry, body.prompt);
        break;
      case "ouija":
        result = await getOuijaAnswer(body.question);
        break;
      case "runes":
        result = await interpretRunes(body.runes, body.question, body.spreadType);
        break;
      case "iching":
        result = await interpretIChing(body.hexagram, body.question, body.changingLines);
        break;
      case "dream":
        result = await interpretDream(body.content, body.mood, body.symbols, body.title);
        break;
      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    return NextResponse.json({ result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Oracle API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
