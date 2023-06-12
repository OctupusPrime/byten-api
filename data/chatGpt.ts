import type { Message } from "../types/chatGpt.ts";

const aiRoleMessages: Message[] = [{
  role: "system",
  content:
    "You are ai helper to improve or write markdown text for user notes.",
},
{
  role: "system",
  content:
    "Respond only with markdown what user ask without aditional information.",
}]

export { aiRoleMessages }