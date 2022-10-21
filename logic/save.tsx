import { z } from "zod";

export const save = z.object({
   password: z.string(),
   wins: z.number(),
   highStreak: z.number(),
   curStreak: z.number(),
   avail_poke: z.object({
      kanto: z.array(z.number()),
      johto: z.array(z.number()),
      hoenn: z.array(z.number()),
      sinnoh: z.array(z.number()),
      unova: z.array(z.number()),
      kalos: z.array(z.number()),
      alola: z.array(z.number()),
      galar: z.array(z.number()),
   }),
});

export type saveType = z.infer<typeof save>;

export const populatePoke = (start: number, amount: number) => {
   return new Array(amount).fill(0).map((elem, i) => start + i);
};

export const defaultSave: saveType = {
   password: "",
   wins: 0,
   highStreak: 0,
   curStreak: 0,
   avail_poke: {
      kanto: populatePoke(1, 151),
      johto: populatePoke(152, 100),
      hoenn: populatePoke(252, 135),
      sinnoh: populatePoke(387, 107),
      unova: populatePoke(494, 156),
      kalos: populatePoke(650, 72),
      alola: populatePoke(722, 88),
      galar: populatePoke(810, 81),
   },
};
