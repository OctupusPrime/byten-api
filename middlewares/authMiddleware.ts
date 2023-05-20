import { Middleware } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { decode } from "https://deno.land/x/djwt@v2.8/mod.ts";

const authMiddleware: Middleware = async (ctx, next) => {
  try {
    const authHeader = ctx.request.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    const token = authHeader.split(" ")[1];

    //TODO: add verify of idToken
    const [, payload] = await decode(token);

    ctx.state.payload = payload;
  } catch (_error) {
    ctx.response.status = 401;
    ctx.response.body = {
      error: "Invalid token",
    };
    return;
  }

  await next();
};

export default authMiddleware;
