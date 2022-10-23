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

export const populatePoke = (region: regionEnum) => {
   let start = 1;
   let amount = 151;
   if (region === regionEnum.kanto) {
      start = 1;
      amount = 151;
   } else if (region === regionEnum.johto) {
      start = 152;
      amount = 100;
   } else if (region === regionEnum.hoenn) {
      start = 252;
      amount = 135;
   } else if (region === regionEnum.sinnoh) {
      start = 387;
      amount = 107;
   } else if (region === regionEnum.unova) {
      start = 494;
      amount = 156;
   } else if (region === regionEnum.kalos) {
      start = 650;
      amount = 72;
   } else if (region === regionEnum.alola) {
      start = 722;
      amount = 88;
   } else if (region === regionEnum.galar) {
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
      kanto: populatePoke(regionEnum.kanto),
      johto: populatePoke(regionEnum.johto),
      hoenn: populatePoke(regionEnum.hoenn),
      sinnoh: populatePoke(regionEnum.sinnoh),
      unova: populatePoke(regionEnum.unova),
      kalos: populatePoke(regionEnum.kalos),
      alola: populatePoke(regionEnum.alola),
      galar: populatePoke(regionEnum.galar),
   },
};
