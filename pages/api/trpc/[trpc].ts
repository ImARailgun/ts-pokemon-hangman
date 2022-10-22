import { initTRPC, TRPCError } from "@trpc/server";

import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { save, saveType, defaultSave } from "../../../logic/save";

const t = initTRPC.create();

export const publicProcedure = t.procedure;
export const { router } = t;
export const { middleware } = t;

const prisma = new PrismaClient();

const appRouter = router({
   post_save: publicProcedure.input(save).mutation(async ({ input }) => {
      if (input.password === "") {
         return {
            text: `post failed: empty password`,
         };
      }

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
            text: `post failed: ${input.password}`,
         };
      }

      return {
         text: `post success: ${input.password}`,
      };
   }),
   get_save: publicProcedure.input(z.string()).query(async ({ input }) => {
      if (input === "") {
         return defaultSave;
      }

      try {
         const response = await prisma.saveData.findUnique({
            where: {
               password: input,
            },
            select: {
               password: true,
               wins: true,
               highStreak: true,
               curStreak: true,
               avail_poke: true,
            },
         });

         if (!response) {
            return defaultSave;
         }

         return response;
      } catch (e) {
         return defaultSave;
      }
   }),
   // getPokemon
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
   router: appRouter,
   createContext: () => ({}),
});
