import type { Cntx } from "../types/oakRouter.ts";

import { autoCompleteMessage } from "../utils/chatGpt.ts";

import { autoCompleteShema } from "../validations/aiAutoCompleteShemas.ts";

import { aiRoleMessages } from '../data/chatGpt.ts'

export default {
  autoComplete: async (ctx: Cntx<"/">): Promise<void> => {
    try {
      const reqData = await ctx.request.body().value;

      autoCompleteShema.parse(reqData);

      const aiResponse = await autoCompleteMessage([
        ...aiRoleMessages,
        {
          role: "user",
          content: reqData.prompt,
        },
      ]);
      
      ctx.response.body = aiResponse.choices[0];
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: error.message,
      };
    }
  },
};
