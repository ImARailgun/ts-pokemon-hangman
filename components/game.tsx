import React, { useState, useEffect, useRef } from "react";
import { never } from "zod";
import Form from "./form";

import { defaultSave, populatePoke, saveType } from "../logic/save";
import { trpc } from "../utils/trpc";

export default function Home() {
   const [save, setSave] = useState(defaultSave);
   const [password, setPassword] = useState({
      password: "",
      updateSave: false,
   });

   const { mutate } = trpc.post_save.useMutation();

   const resGetSave = trpc.get_save.useQuery(password.password, {
      refetchOnWindowFocus: false,

      onSuccess(data) {
         // row not in database
         if (data.password === "") {
            // row not in database && currently anonymous
            if (save.password === "") {
               mutate({ ...save, password: password.password } as saveType);
               setSave({ ...save, password: password.password } as saveType);
            }
            // row not in database && not anonymous
            else {
               mutate({
                  ...defaultSave,
                  password: password.password,
               } as saveType);
               setSave({
                  ...defaultSave,
                  password: password.password,
               } as saveType);
            }
         }
         // row in database
         else {
            // row in database && currently anonymous
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

   useEffect(() => {
      if (resGetSave.data) {
         if (
            password.password !== "" &&
            resGetSave.data?.password === password.password &&
            password.updateSave
         ) {
            setPassword({ ...password, updateSave: false });
            setSave(resGetSave.data as saveType);
         }
      }
   }, [password, resGetSave]);

   const handleSubmit = (event: any) => {
      event.preventDefault();

      const input = event.target.password.value;
      if (input !== "" && input !== save.password) {
         setPassword({ password: input, updateSave: true });
      }
   };

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

   return (
      <>
         <div>save password: {save.password}</div>
         <div>save wins: {save.wins}</div>
         <div>api password: {resGetSave.data?.password}</div>
         <div>api wins: {resGetSave.data?.wins}</div>
         <div>
            <Form handleSubmit={handleSubmit} />
         </div>
         <button type="button" onClick={addWin}>
            win button
         </button>
      </>
   );
}
