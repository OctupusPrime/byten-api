interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: "assistant";
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
}

interface GPT3Response {
  id: string;
  object: string;
  model: string;
  created: number;
  choices: any[];
}

export type { Message, ChatResponse, GPT3Response };
