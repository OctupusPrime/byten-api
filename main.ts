import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

//middlewares
import authMiddleware from "./middlewares/authMiddleware.ts";

//routes
import aiPromptsRouter from "./routes/aiPromptsRouter.ts";

const port = 8080;
const app = new Application();

app.use(oakCors());

app.use(authMiddleware);

app.use(aiPromptsRouter.routes());
app.use(aiPromptsRouter.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listening on:")} ${green(url)}`);
});

await app.listen({ port });
