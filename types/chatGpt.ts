interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GPT3Response {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number,
    completion_tokens: number
    total_tokens: number
  }
  choices: {
    message: Message,
    finish_reason?: string,
    index: number
  }[];
}

export type { Message, GPT3Response };
