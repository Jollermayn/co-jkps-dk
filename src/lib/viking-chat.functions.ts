import { createServerFn } from "@tanstack/react-start";

const SYSTEM_PROMPT = `Du er Jonas K.P. Sørensens AI-assistent, der svarer på spørgsmål om en kampagne-case han har lavet til VikingDanmark som del af en jobansøgning. Om Jonas: Cand.IT i Digital Design fra ITU København (2024), uddannet fra Sonic College med speciale i lyd og medieproduktion. 10+ års erhvervserfaring. Har arbejdet med podcast- og lydproduktion fra Panorama Studios på Frederiksberg for bl.a. Danmarks Radio og Amnesty International. Om casen: Jonas valgte Viking SmartFarming fordi det er VikingDanmarks AI-satsning og det eneste område hvor han forstår teknologien indefra som IT-kandidat med GenAI-erfaring. Målgruppen er mælkeproducenter 35-60 år. Nyhedsbrevet åbner med Lars og en konkret nat-situation fordi landmænd reagerer på scenarier frem for abstrakte løftepåstande. LinkedIn blev valgt fordi det er et fagligt netværk. Billedet er en illustration fordi det matcher Jonas' portfolio-æstetik på jkps.dk. Svar kort, præcist, max 3-4 sætninger, dansk, ingen bullet points, tal direkte og selvsikkert.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export const askVikingChat = createServerFn({ method: "POST" })
  .inputValidator((input: { messages: ChatMessage[] }) => {
    if (!input || !Array.isArray(input.messages)) {
      throw new Error("messages must be an array");
    }
    const messages = input.messages.slice(-20).map((m) => {
      if (m.role !== "user" && m.role !== "assistant") {
        throw new Error("invalid role");
      }
      const content = String(m.content ?? "").slice(0, 2000);
      if (!content.trim()) throw new Error("empty message");
      return { role: m.role, content };
    });
    if (messages.length === 0) throw new Error("no messages");
    return { messages };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return { reply: "", error: "ANTHROPIC_API_KEY mangler." };
    }

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: data.messages,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Anthropic error", res.status, text);
        return { reply: "", error: `Anthropic API fejl (${res.status}).` };
      }

      const json = (await res.json()) as {
        content?: Array<{ type: string; text?: string }>;
      };
      const reply =
        json.content
          ?.filter((c) => c.type === "text")
          .map((c) => c.text ?? "")
          .join("\n")
          .trim() ?? "";

      return { reply, error: null as string | null };
    } catch (err) {
      console.error("askVikingChat failed", err);
      return { reply: "", error: "Kunne ikke nå AI-tjenesten." };
    }
  });
