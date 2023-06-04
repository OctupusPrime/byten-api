type ChatGptMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type { ChatGptMessage };
