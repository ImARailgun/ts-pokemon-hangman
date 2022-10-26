import React, { useState, useEffect } from "react";
import Form from "./form";
import RegionSelect from "./regionSelect";
import HangMan from "./hangMan";
import Footer from "./footer";
import Modal from "./modal";

import styles from "../styles/game.module.css";

import { trpc } from "../utils/trpc";

import { defaultSave, populatePoke, saveType, regionType } from "../logic/save";
import { defaultHangMan, guessALetter } from "../logic/hangMan";
import {
   generateDex,
   selectRegion,
   defaultGensSelected,
} from "../logic/select-dex";
import { useLocalState } from "../logic/local-storage";

export default function Home() {
   const [save, setSave] = useState(defaultSave);
   const [password, setPassword] = useLocalState();
   const [pokemon, setPokemon] = useState({
      name: "",
      sprite: "",
   });
   const [newDex, setNewDex] = useState(true);
   const [hangMan, setHangMan] = useState(defaultHangMan);
   const [dexSelected, setDexSelected] = useState({
      dex: 999,
      region: "kanto" as regionType,
   });
   const [gensSelected, setGensSelected] = useState(defaultGensSelected);

   useEffect(() => {
      const region = selectRegion(gensSelected.regions) as regionType;

      setDexSelected({
         dex: generateDex(save.avail_poke[region]),
         region,
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [gensSelected.regions, newDex, save.password]);

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
                  curStreak: data.curStreak,
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
            setHangMan({
               ...hangMan,
               word: data.name,
               length: data.name.length,
            });
         }
      },
   });

   const resetGame = () => {
      setGensSelected({
         ...gensSelected,
         selecting: false,
      });
      setHangMan({
         ...defaultHangMan,
         word: hangMan.word,
         length: hangMan.length,
      });
      setNewDex(!newDex);
   };

   const startGame = () => {
      setGensSelected({
         ...gensSelected,
         selecting: false,
      });
      setHangMan({
         ...defaultHangMan,
         word: hangMan.word,
         length: hangMan.length,
      });
   };

   const returnToSelectGens = () => {
      setHangMan({
         ...defaultHangMan,
         word: hangMan.word,
         length: hangMan.length,
      });
      setGensSelected({
         ...gensSelected,
         selecting: true,
      });
      setNewDex(!newDex);
   };

   useEffect(() => {
      if (hangMan.gameOver === "win") {
         const newSave = {
            ...save,
            wins: save.wins + 1,
            curStreak: save.curStreak + 1,
            highStreak:
               save.curStreak + 1 > save.highStreak
                  ? save.curStreak + 1
                  : save.highStreak,
            avail_poke: {
               ...save.avail_poke,
            },
         } as saveType;

         const availArr: number[] = newSave.avail_poke[dexSelected.region];

         const index = availArr.indexOf(dexSelected.dex);

         let newArr = availArr
            .slice(0, index)
            .concat(availArr.slice(index + 1));

         if (newArr.length === 0) {
            newArr = populatePoke(dexSelected.region);
         }

         newSave.avail_poke[dexSelected.region] = newArr;

         // create function for returning newSave instead of having everything done here

         mutate(newSave);

         setSave(newSave);
      } else if (hangMan.gameOver === "lose") {
         mutate({
            ...save,
            curStreak: 0,
         });

         setSave({
            ...save,
            curStreak: 0,
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [hangMan.gameOver]);

   // custom hook?
   useEffect(() => {
      if (gensSelected.selecting || hangMan.word === "") {
         return () => {};
      }

      // doesnt work on Android
      const detectKeyDown = (e: KeyboardEvent) => {
         setHangMan(guessALetter(e.key, hangMan));
      };

      // allows android to play by capturing input into text area
      // @ts-ignore
      const detectInput = (e) => {
         setHangMan(guessALetter(e.data!, hangMan));
      };

      document.addEventListener("input", detectInput, true);
      document.addEventListener("keydown", detectKeyDown, true);

      return () => [
         document.removeEventListener("input", detectInput, true),
         document.removeEventListener("keydown", detectKeyDown, true),
      ];
   }, [hangMan, gensSelected.selecting]);

   // custom hook?
   useEffect(() => {
      if (hangMan.gameOver === "no") {
         return () => {};
      }

      const detectKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Enter") {
            resetGame();
         }
      };
      document.addEventListener("keydown", detectKeyDown, true);

      return () => document.removeEventListener("keydown", detectKeyDown, true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [hangMan.gameOver]);

   return (
      <>
         <div className={styles.gamePad} />
         {gensSelected.selecting && (
            <>
               <div>
                  <RegionSelect
                     setGensSelected={setGensSelected}
                     gensSelected={gensSelected}
                  />
               </div>
               <div className={styles.startPad} />
               <button type="button" onClick={startGame}>
                  Start Game!
               </button>

               <div className={styles.formPad} />

               <div>
                  <Form
                     setPassword={setPassword}
                     save={save}
                     password={password}
                  />
               </div>
            </>
         )}

         {!gensSelected.selecting && (
            <>
               <HangMan pokemon={pokemon} hangMan={hangMan} />

               {hangMan.gameOver !== "no" && (
                  <Modal
                     resetGame={resetGame}
                     returnToSelectGens={returnToSelectGens}
                     word={hangMan.word}
                     gameOver={hangMan.gameOver}
                  />
               )}
               <textarea className={styles.makeKeyboard} value="" />
            </>
         )}

         <Footer save={save} />
      </>
   );
}
