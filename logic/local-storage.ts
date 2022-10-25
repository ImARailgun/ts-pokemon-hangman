import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalState = (): [string, Dispatch<SetStateAction<string>>] => {
   const [password, setPassword] = useState("");

   useEffect(() => {
      const pass = localStorage.getItem("password");
      if (pass) {
         setPassword(pass);
      }
   }, []);

   useEffect(() => {
      localStorage.setItem("password", password);
   }, [password]);

   return [password, setPassword];
};
