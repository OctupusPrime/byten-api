import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import aiAutoCompleteController from "../contollers/aiAutoCompleteController.ts";

const router = new Router({
  prefix: "/ai-auto-complete",
});

router.post("/", aiAutoCompleteController.autoComplete);

export default router;
