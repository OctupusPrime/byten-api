import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import notesController from "../contollers/notesController.ts";

const router = new Router({
  prefix: "/notes",
});

router.get("/", notesController.getNotes);
router.get("/:id", notesController.getNoteById);
router.post("/", notesController.createNote);
router.put("/", notesController.editNote);
router.delete("/:id", notesController.deleteNote);

export default router;
