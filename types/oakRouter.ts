import {
  RouterContext,
  RouteParams,
} from "https://deno.land/x/oak@v11.1.0/router.ts";

export type Cntx<Url extends string> = RouterContext<Url, RouteParams<Url>>;
