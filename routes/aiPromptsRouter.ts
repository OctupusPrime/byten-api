import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import aiController from "../contollers/aiPromptsController.ts";

const router = new Router({
  prefix: "/ai-prompts",
});

router.get("/", aiController.getPrompts);
router.post("/create", aiController.createPrompt);
router.put("/:id", aiController.editPrompt);
router.delete("/:id", aiController.deletePrompt);

export default router;
