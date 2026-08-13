"use client";

import { useState } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "Quels programmes propose l'Université ?",
  "Quelles sont les conditions d'admission ?",
  "Comment s'inscrire ?",
  "Quels sont les frais ?",
];

export default function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const json = await res.json();

      if (!res.ok) {
        const message =
          json.error === "not_configured"
            ? "Cet assistant n'est pas encore activé par l'administration du CCIGA. Vous pouvez utiliser le formulaire de contact en attendant."
            : json.message ?? "Une erreur est survenue. Veuillez réessayer.";
        setMessages((m) => [...m, { role: "assistant", content: message }]);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: json.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Impossible de contacter l'assistant. Vérifiez votre connexion." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col rounded-xl border border-border bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-border p-4">
            <span className="text-sm font-semibold text-primary">Demandez à CCIGA AI</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="text-muted hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div>
                <p className="mb-3 text-sm text-muted">
                  👋 Bonjour ! Posez-moi une question sur les programmes, l&apos;admission, les
                  frais ou la vie au CCIGA.
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs text-foreground hover:border-primary"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "bg-background text-foreground"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-lg bg-background px-3 py-2 text-sm text-muted">
                …
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Votre question…"
              className="input flex-1"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-light"
      >
        <span aria-hidden>🤖</span>
        Ask CCIGA AI
      </button>
    </div>
  );
}
