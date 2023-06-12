import type { Message, GPT3Response } from "../types/chatGpt.ts";

const autoCompleteMessage = async (
  commads: Message[]
): Promise<GPT3Response> => {
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

  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()));
  }

  const gpt3Response: GPT3Response = await response.json();

  return gpt3Response;
};

export { autoCompleteMessage };
