import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

const autoCompleteShema = z.object({
  state: z.string().min(3).max(1000).optional(),
  prompt: z.string().min(3).max(200),
});

export {
  autoCompleteShema
};
