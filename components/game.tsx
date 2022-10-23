import React, { useState, useEffect } from "react";
import { trpc } from "../utils/trpc";
import Form from "./form";

import { defaultSave, saveType } from "../logic/save";
import { defaultHangMan } from "../logic/hangMan";
import {
   generateDex,
   selectRegion,
   defaultGensSelected,
} from "../logic/select-dex";

export default function Home() {
   const [save, setSave] = useState(defaultSave);
   const [password, setPassword] = useState("");
   const [pokemon, setPokemon] = useState(["", ""]);
   const [hangMan, setHangMan] = useState(defaultHangMan);
   const [dexSelected, setDexSelected] = useState({ dex: 999, region: "" });
   const [gensSelected, setGensSelected] = useState(defaultGensSelected);

   /*
      on win:
      update save stats
      remove selected dex from available pok(selectedDex.region)
      if array is empty (array.length === 1) (cause of closure snapshotting)
      populate poke(selectedDex.region)

      mutate save

   */

   useEffect(() => {
      const region = selectRegion(gensSelected.regions);

      setDexSelected({
         // @ts-ignore
         dex: generateDex(save.avail_poke[region]),
         region,
      });
   }, [
      gensSelected.regions,
      hangMan.gameOver,
      gensSelected.selecting,
      save.password,
      save.avail_poke,
   ]);

   const { mutate } = trpc.post_save.useMutation();

   trpc.get_save.useQuery(password, {
      refetchOnWindowFocus: false,

      onSuccess(data) {
         // row not in database
         if (data.password === "") {
            // row not in database && anonymous
            if (save.password === "") {
               mutate({ ...save, password } as saveType);
               setSave({ ...save, password } as saveType);
            }
            // row not in database && not anonymous
            else {
               mutate({
                  ...defaultSave,
                  password,
               } as saveType);
               setSave({
                  ...defaultSave,
                  password,
               } as saveType);
            }
         }
         // row in database
         else {
            // row in database && anonymous
            if (save.password === "") {
               const newSave: saveType = {
                  ...save,
                  password: data.password,
                  wins: data.wins + save.wins,
                  highStreak:
                     data.highStreak > save.highStreak
                        ? data.highStreak
                        : save.highStreak,
                  curStreak: save.curStreak,
               };

               mutate(newSave);

               setSave(newSave);
            }
            // row in database && not anonymous
            else {
               setSave(data as saveType);
            }
         }
      },
   });

   trpc.get_pokemon.useQuery(dexSelected.dex, {
      refetchOnWindowFocus: false,

      onSuccess(data) {
         if (hangMan.gameOver === "no") {
            setPokemon(data);
         }
      },
   });

   const addWin = () => {
      setSave({
         ...save,
         wins: save.wins + 1,
      });

      mutate({
         ...save,
         wins: save.wins + 1,
      });
   };

   const handleSubmit = (event: any) => {
      event.preventDefault();

      const input = event.target.password.value;
      if (input !== "" && input !== save.password) {
         setPassword(input);
      }
   };

   return (
      <>
         <div>save password: {save.password}</div>
         <div>save wins: {save.wins}</div>

         <div>
            <Form handleSubmit={handleSubmit} />
         </div>
         <button type="button" onClick={addWin}>
            win button
         </button>

         <div>
            <div>{pokemon[0]}</div>
            <img src={pokemon[1]} alt="sprite" />
         </div>
      </>
   );
}
