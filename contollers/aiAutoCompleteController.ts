import type { Cntx } from "../types/oakRouter.ts";

import { autoCompleteMessage } from "../utils/openAi.ts";

export default {
  autoComplete: async (ctx: Cntx<"/">): Promise<void> => {
    try {
      const response = await autoCompleteMessage([
        {
          role: "system",
          content:
            "You are ai helper to improve or write markdown text for user notes.",
        },
        {
          role: "system",
          content:
            "Respond only with markdown what user ask without aditional information.",
        },
        {
          role: "user",
          content: "create table with fake data about cityes with 4 elements",
        },
      ]);
      ctx.response.body = response;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  },
};
