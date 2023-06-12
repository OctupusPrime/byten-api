import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "https://cdn.skypack.dev/firebase@9.22.0/firestore/lite";
import { db } from "../lib/firebase.ts";

import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";

import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/async.ts";

import type { Cntx } from "../types/oakRouter.ts";
import type { User } from "../types/data.ts";
import {
  CreateNoteSchema,
  DeleteNoteSchema,
  EditNoteSchema,
  GetNoteSchema,
} from "../validations/notesShemas.ts";
import getColorFromString from "../utils/getColorFromString.ts";

export default {
  getNotes: async (ctx: Cntx<"/">): Promise<void> => {
    try {
      const user: User = ctx.state.payload;

      const getRef = collection(db, "notes", user.user_id, "items");

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
  getNoteById: async (ctx: Cntx<"/:id">): Promise<void> => {
    try {
      const user: User = ctx.state.payload;

      const query = getQuery(ctx, { mergeParams: true });

      GetNoteSchema.parse(query);

      const getSingleRef = doc(db, "notes", user.user_id, "items", query.id);

      const dbData = await getDoc(getSingleRef);

      const resData = dbData.data();

      if (!resData) throw new Error("Note not found");

      ctx.response.body = resData;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  },
  createNote: async (ctx: Cntx<"/">): Promise<void> => {
    try {
      const user: User = ctx.state.payload;

      const reqData = await ctx.request.body().value;

      CreateNoteSchema.parse(reqData);

      const newNote = {
        ...reqData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: await nanoid(10),
        color: getColorFromString(reqData.title),
      };
      const createRef = doc(db, "notes", user.user_id, "items", newNote.id);

      await setDoc(createRef, newNote);

      ctx.response.body = newNote;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  },
  editNote: async (ctx: Cntx<"/">): Promise<void> => {
    try {
      const user: User = ctx.state.payload;

      const reqData = await ctx.request.body().value;

      EditNoteSchema.parse(reqData);

      const updatedNote = {
        ...reqData,
        updatedAt: new Date().toISOString(),
      };

      const editRef = doc(db, "notes", user.user_id, "items", updatedNote.id);

      await updateDoc(editRef, updatedNote);

      ctx.response.body = reqData;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  },
  deleteNote: async (ctx: Cntx<"/:id">): Promise<void> => {
    try {
      const user: User = ctx.state.payload;

      const query = getQuery(ctx, { mergeParams: true });

      DeleteNoteSchema.parse(query);

      const deleteRef = doc(db, "notes", user.user_id, "items", query.id);

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
