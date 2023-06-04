import type { Message, ChatResponse, GPT3Response } from "../types/chatGpt.ts";

const autoCompleteMessage = async (
  commads: Message[]
): Promise<ChatResponse> => {
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

  return {
    id: gpt3Response.id,
    object: gpt3Response.object,
    created: gpt3Response.created,
    model: gpt3Response.model,
    choices: gpt3Response.choices.map((choice) => ({
      message: {
        role: "assistant",
        content: choice.text,
      },
      finish_reason: choice.finish_reason,
      index: choice.index,
    })),
  };
};

export { autoCompleteMessage };
