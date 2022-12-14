import { regionType } from "./save";

export const selectRegion = (regions: { [key: string]: boolean }) => {
   const selectedRegions = [];

   for (const region in regions) {
      if (regions[region] === true) {
         selectedRegions.push(region);
      }
   }

   if (selectedRegions.length === 0) {
      return Object.keys(regions)[
         Math.floor(Math.random() * Object.keys(regions).length)
      ];
   }

   return selectedRegions[Math.floor(Math.random() * selectedRegions.length)];
};

export const generateDex = (available: number[]) =>
   available[Math.floor(Math.random() * available.length)];

export const defaultGensSelected = {
   selecting: true,
   regions: {
      kanto: false,
      johto: false,
      hoenn: false,
      sinnoh: false,
      unova: false,
      kalos: false,
      alola: false,
      galar: false,
   },
};

export type gensSelectedType = {
   selecting: boolean;
   regions: {
      kanto: boolean;
      johto: boolean;
      hoenn: boolean;
      sinnoh: boolean;
      unova: boolean;
      kalos: boolean;
      alola: boolean;
      galar: boolean;
   };
};
