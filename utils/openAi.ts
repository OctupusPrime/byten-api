import type { ChatGptMessage } from "../types/chatGpt.ts";

const autoCompleteMessage = async (
  commads: ChatGptMessage[],
  message?: string
): Promise<string> => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: commads,
      temperature: 0.2,
    }),
  });

  const data = (await response.json()) as any;

  return data;
};

export { autoCompleteMessage };
