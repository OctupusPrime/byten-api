import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

const promptType = z.enum(["modify", "prompt"]);

const PromptSchema = z.object({
  title: z.string().min(3).max(50),
  command: z.string().min(3).max(200),
  type: promptType,
  id: z.string(),
});

const GetPromptsShema = z.object({
  type: promptType,
});

const CreatePromptSchema = PromptSchema.omit({ id: true });

const EditPromptSchema = PromptSchema.partial({
  title: true,
  prompt: true,
  type: true,
});

const DeletePromptSchema = z.object({
  id: z.string(),
  type: promptType,
});

export {
  CreatePromptSchema,
  EditPromptSchema,
  DeletePromptSchema,
  GetPromptsShema,
};
