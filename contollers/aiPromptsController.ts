import {
  doc,
  collection,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "https://cdn.skypack.dev/firebase@9.22.0/firestore/lite";
import { db } from "../lib/firebase.ts";
import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";

import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/async.ts";

import {
  CreatePromptSchema,
  DeletePromptSchema,
  EditPromptSchema,
  GetPromptsShema,
} from "../validations/aiPromptsShemas.ts";

import type { Cntx } from "../types/oakRouter.ts";
import type { User } from "../types/data.ts";

export default {
  getPrompts: async (ctx: Cntx<"/">): Promise<void> => {
    try {
      const user: User = ctx.state.payload;

      const query = getQuery(ctx, { mergeParams: true });

      GetPromptsShema.parse(query);

      const getRef = collection(db, "ai-prompts", user.user_id, query.type);

      const dbData = await getDocs(getRef);

      const data = dbData.docs.map((doc) => doc.data());
      ctx.response.body = data;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  },
  createPrompt: async (ctx: Cntx<"/create">): Promise<void> => {
    try {
      const user: User = ctx.state.payload;

      const reqData = await ctx.request.body().value;

      CreatePromptSchema.parse(reqData);

      const newPrompt = {
        ...reqData,
        id: await nanoid(10),
      };

      const addRef = doc(
        db,
        "ai-prompts",
        user.user_id,
        newPrompt.type,
        newPrompt.id
      );
      await setDoc(addRef, newPrompt);

      ctx.response.body = newPrompt;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  },
  editPrompt: async (ctx: Cntx<"/:id">): Promise<void> => {
    try {
      const user: User = ctx.state.payload;

      const query = getQuery(ctx, { mergeParams: true });

      const reqData = { ...(await ctx.request.body().value), id: query.id };

      EditPromptSchema.parse(reqData);

      const editRef = doc(
        db,
        "ai-prompts",
        user.user_id,
        reqData.type,
        reqData.id
      );

      await updateDoc(editRef, reqData);

      ctx.response.body = reqData;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  },
  deletePrompt: async (ctx: Cntx<"/:id">): Promise<void> => {
    try {
      const user: User = ctx.state.payload;

      const query = getQuery(ctx, { mergeParams: true });

      DeletePromptSchema.parse(query);

      const deleteRef = doc(
        db,
        "ai-prompts",
        user.user_id,
        query.type,
        query.id
      );

      await deleteDoc(deleteRef);

      ctx.response.body = query;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  },
};
