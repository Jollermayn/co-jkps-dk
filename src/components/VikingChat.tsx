import { useRef, useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askVikingChat } from "@/lib/viking-chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Hvorfor SmartFarming?",
  "Hvorfor LinkedIn?",
  "Hvorfor illustration?",
  "Strategien bag åbningen?",
];

export default function VikingChat() {
  const ask = useServerFn(askVikingChat);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await ask({ data: { messages: next } });
      if (res.error || !res.reply) {
        setError(res.error ?? "Tomt svar.");
      } else {
        setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
      }
    } catch {
      setError("Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md bg-cream text-navy-deep shadow-2xl ring-1 ring-black/10 overflow-hidden">
      <div
        ref={scrollRef}
        className="max-h-[420px] min-h-[180px] overflow-y-auto px-5 sm:px-6 py-5 space-y-4 text-[0.95rem] leading-relaxed"
      >
        {messages.length === 0 && (
          <p className="text-navy-deep/55 italic">
            Stil et spørgsmål om casen — strategi, valg, målgruppe, format.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-sm px-4 py-2.5 text-cream"
                  : "max-w-[90%] rounded-2xl rounded-bl-sm px-4 py-2.5 bg-navy-deep/5 text-navy-deep"
              }
              style={m.role === "user" ? { backgroundColor: "#0D1B2A" } : undefined}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-navy-deep/5 px-4 py-3">
              <span className="inline-flex gap-1 items-end h-3" aria-label="Skriver">
                <span className="h-1.5 w-1.5 rounded-full bg-navy-deep/50 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-navy-deep/50 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-navy-deep/50 animate-bounce" />
              </span>
            </div>
          </div>
        )}
        {error && <p className="text-[0.85rem] text-red-700">{error}</p>}
      </div>

      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 px-5 sm:px-6 pb-4">
          {SUGGESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              disabled={loading}
              className="rounded-full border border-navy-deep/20 px-3.5 py-1.5 text-[0.82rem] text-navy-deep/80 hover:bg-navy-deep hover:text-cream hover:border-navy-deep transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-navy-deep/10 px-3 py-3 bg-cream"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv et spørgsmål…"
          className="flex-1 rounded-md bg-transparent px-3 py-2 text-[0.95rem] text-navy-deep placeholder:text-navy-deep/40 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-md px-4 py-2 text-[0.88rem] font-semibold text-cream transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ backgroundColor: "#B83A20" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
