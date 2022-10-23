import type { NextPage } from "next";
import Head from "next/head";
import Game from "../components/game";
import Title from "../components/title";

function Home() {
   return (
      <div>
         <Head>
            <title>Pokemon Geng-man</title>
         </Head>

         <Title />

         <Game />
      </div>
   );
}

export default Home;
