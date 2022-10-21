import { useState, useEffect } from "react";

import { defaultSave, populatePoke } from "../logic/save";
import { trpc } from "../utils/trpc";

export default function Home() {
   const [save, setSave] = useState(defaultSave);

   useEffect(() => {
      setSave({ ...save, password: "test" });
   }, []);

   const res = trpc.post_save.useQuery(save);

   return (
      <>
         <div>{res.data?.text}</div>
         <div>{save.avail_poke.kanto}</div>
      </>
   );
}
