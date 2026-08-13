import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/ai/systemPrompt";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 20;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "not_configured", message: "L'assistant CCIGA AI n'est pas encore configuré." },
      { status: 503 },
    );
  }

  const { messages } = (await request.json()) ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Message requis." }, { status: 400 });
  }

  const history: ChatMessage[] = messages
    .filter(
      (m): m is ChatMessage =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= MAX_MESSAGE_LENGTH,
    )
    .slice(-MAX_HISTORY);

  if (history.length === 0) {
    return NextResponse.json({ error: "Message invalide." }, { status: 400 });
  }

  const system = await buildSystemPrompt();
  const model = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 500,
        system,
        messages: history,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic API error:", res.status, errText);
      return NextResponse.json(
        { error: "upstream_error", message: "L'assistant est momentanément indisponible." },
        { status: 502 },
      );
    }

    const data = await res.json();
    const reply = data.content?.[0]?.text ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Assistant call failed:", err);
    return NextResponse.json(
      { error: "upstream_error", message: "L'assistant est momentanément indisponible." },
      { status: 502 },
    );
  }
}
