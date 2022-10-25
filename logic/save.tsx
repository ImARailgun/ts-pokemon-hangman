import { z } from "zod";

export enum regionEnum {
   kanto,
   johto,
   hoenn,
   sinnoh,
   unova,
   kalos,
   galar,
   alola,
}

export type regionType =
   | "kanto"
   | "johto"
   | "hoenn"
   | "sinnoh"
   | "unova"
   | "kalos"
   | "galar"
   | "alola";

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

export const populatePoke = (region: regionType) => {
   let start = 1;
   let amount = 151;
   if (region === "kanto") {
      start = 1;
      amount = 151;
   } else if (region === "johto") {
      start = 152;
      amount = 100;
   } else if (region === "hoenn") {
      start = 252;
      amount = 135;
   } else if (region === "sinnoh") {
      start = 387;
      amount = 107;
   } else if (region === "unova") {
      start = 494;
      amount = 156;
   } else if (region === "kalos") {
      start = 650;
      amount = 72;
   } else if (region === "alola") {
      start = 722;
      amount = 88;
   } else if (region === "galar") {
      start = 810;
      amount = 81;
   }
   return new Array(amount).fill(0).map((elem, i) => start + i);
};

export const defaultSave: saveType = {
   password: "",
   wins: 0,
   highStreak: 0,
   curStreak: 0,
   avail_poke: {
      kanto: populatePoke("kanto"),
      johto: populatePoke("johto"),
      hoenn: populatePoke("hoenn"),
      sinnoh: populatePoke("sinnoh"),
      unova: populatePoke("unova"),
      kalos: populatePoke("kalos"),
      alola: populatePoke("alola"),
      galar: populatePoke("galar"),
   },
};
