import { initTRPC } from "@trpc/server";

import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { save, defaultSave } from "../../../logic/save";

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

      console.log("post_save call", input.password);

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
      console.log("get_save call", input);
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
   get_pokemon: publicProcedure.input(z.number()).query(async ({ input }) => {
      if (input === 999) {
         return ["", ""];
      }

      console.log("get_pokemon call", input);
      const requestURL = `https://pokeapi.co/api/v2/pokemon/${String(input)}/`;

      const result = await axios({
         method: "get",
         url: requestURL,
      }).then((response) => {
         const pokemonName =
            String(response.data.species.name).slice(0, 1).toUpperCase() +
            String(response.data.species.name).slice(1);

         const spriteURL: string =
            Math.floor(Math.random() * 11) >= 10
               ? response.data.sprites.front_shiny
               : response.data.sprites.front_default;

         return [pokemonName, spriteURL];
      });

      return result;
   }),
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
   router: appRouter,
   createContext: () => ({}),
});
