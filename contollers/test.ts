import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
// import { type User } from "../types/firebase.ts";
import {
  collection,
  getDocs,
} from "https://cdn.skypack.dev/firebase@9.22.0/firestore/lite";
import { db } from "../lib/firebase.ts";

type Cntx = RouterContext<
  "",
  Record<string | number, string | undefined>,
  // deno-lint-ignore no-explicit-any
  Record<string, any>
>;

export default {
  test: async (ctx: Cntx) => {
    // const payload: User = ctx.state.payload;

    const test = await getDocs(collection(db, "test"));

    const data = test.docs.map((doc) => doc.data());
    ctx.response.body = data;
  },
};
