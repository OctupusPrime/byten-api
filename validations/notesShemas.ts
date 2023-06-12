import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

const NoteSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  body: z.string().optional(),
  color: z.string().optional(),
});

const GetNoteSchema = z.object({
  id: z.string(),
});

const CreateNoteSchema = NoteSchema.omit({ id: true, color: true });

const EditNoteSchema = NoteSchema.partial({
  title: true,
  body: true,
  type: true,
});

const DeleteNoteSchema = z.object({
  id: z.string(),
});

export { GetNoteSchema, CreateNoteSchema, EditNoteSchema, DeleteNoteSchema };
