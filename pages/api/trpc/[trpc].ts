import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;

import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { save } from "../../../logic/save";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const appRouter = router({
   post_save: publicProcedure.input(save).query(async ({ input }) => {
      if (input.password === "") {
         return {
            text: `failure password: ${input.password}`,
         };
      }

      console.log("password:", input.password);

      try {
         await prisma.saveData.upsert({
            where: {
               password: input.password,
            },
            update: {
               ...input,
            },
            create: {
               ...input,
            },
         });
      } catch (e) {
         console.error(e);
         return {
            text: `failure password: ${input.password}`,
         };
      }

      return {
         text: `sucess password: ${input.password}`,
      };
   }),
   //retrieve_save
   //getPokemon
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
   router: appRouter,
   createContext: () => ({}),
});
