import { useRef, useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasInteracted) return;
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          className="w-[min(92vw,380px)] rounded-xl bg-cream text-navy-deep shadow-2xl ring-1 ring-black/15 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-label="Spørg om casen"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 text-cream"
            style={{ backgroundColor: "#0D1B2A" }}
          >
            <div>
              <div className="font-display text-[0.95rem] font-semibold leading-tight">
                Bag om casen
              </div>
              <div className="text-[0.72rem] text-cream/65">
                Spørg løs — AI svarer
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Luk chat"
              className="rounded-md p-1.5 text-cream/80 hover:bg-cream/10 hover:text-cream transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 max-h-[55vh] min-h-[180px] overflow-y-auto px-4 py-4 space-y-3 text-[0.92rem] leading-relaxed"
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
                      ? "max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2 text-cream"
                      : "max-w-[90%] rounded-2xl rounded-bl-sm px-3.5 py-2 bg-navy-deep/5 text-navy-deep"
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
            {error && <p className="text-[0.82rem] text-red-700">{error}</p>}
          </div>

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  disabled={loading}
                  className="rounded-full border border-navy-deep/20 px-3 py-1 text-[0.78rem] text-navy-deep/80 hover:bg-navy-deep hover:text-cream hover:border-navy-deep transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-navy-deep/10 px-3 py-2.5 bg-cream"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Skriv et spørgsmål…"
              className="flex-1 rounded-md bg-transparent px-2 py-1.5 text-[0.92rem] text-navy-deep placeholder:text-navy-deep/40 focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-md px-3.5 py-1.5 text-[0.85rem] font-semibold text-cream transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: "#B83A20" }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating trigger */}
      <div className="relative">
        {/* Tooltip */}
        {!open && showTooltip && (
          <div
            className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-md px-3 py-1.5 text-[0.8rem] font-medium text-cream shadow-lg animate-fade-in pointer-events-none"
            style={{ backgroundColor: "#0D1B2A" }}
            role="tooltip"
          >
            Spørg mig om de strategiske valg →
            <span
              className="absolute -bottom-1 right-6 h-2 w-2 rotate-45"
              style={{ backgroundColor: "#0D1B2A" }}
              aria-hidden
            />
          </div>
        )}

        {/* Pulse ring — stronger, slower */}
        {!open && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping pointer-events-none"
              style={{ backgroundColor: "#B83A20", opacity: 0.5, animationDuration: "2.8s" }}
              aria-hidden
            />
            <span
              className="absolute inset-0 rounded-full ring-2 ring-[#B83A20]/70 animate-ping pointer-events-none"
              style={{ animationDuration: "2.8s", animationDelay: "0.6s" }}
              aria-hidden
            />
          </>
        )}

        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setHasInteracted(true);
            setShowTooltip(false);
          }}
          aria-expanded={open}
          aria-label={open ? "Luk chat" : "Spørg om casen"}
          className="relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[1rem] font-semibold text-cream shadow-2xl ring-1 ring-black/20 hover:opacity-95 transition-opacity"
          style={{ backgroundColor: "#B83A20" }}
        >
          {open ? (
            <>
              <X size={18} />
              <span>Luk</span>
            </>
          ) : (
            <span>💬 Jonas' AI er klar</span>
          )}
          {/* Notification dot */}
          {!open && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-cream" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
