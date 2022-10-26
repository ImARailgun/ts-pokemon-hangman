import {
   hangManType,
   createDisplayText,
   createIncorrectDisplay,
} from "../logic/hangMan";
import styles from "../styles/hangMan.module.css";

type Props = {
   pokemon: { name: string; sprite: string };
   hangMan: hangManType;
};

export default function HangMan({ pokemon, hangMan }: Props) {
   const gengarSprite = (lives: number) => `/${String(lives)}.png`;

   const gengarClass =
      hangMan.gameOver === "lose" ? styles.gengarClass : styles.hangImg;

   return (
      <>
         <div className={styles.container}>
            <div className={styles.third}>
               {hangMan.lives < 5 && (
                  <h3
                     className={`${styles.textboxBorder} ${styles.incorrectDisplay}`}
                  >
                     {" "}
                     {createIncorrectDisplay(hangMan.incorrectGuesses)}
                  </h3>
               )}
            </div>
            <div className={`${styles.third} ${styles.imgCont}`}>
               <img
                  src={pokemon.sprite}
                  alt="sprite"
                  className={styles.hangImg}
               />
            </div>
            <div className={styles.third}>
               <img
                  src={gengarSprite(hangMan.lives)}
                  alt="gengar"
                  className={gengarClass}
               />
            </div>
         </div>
         <div>
            <h3 className={styles.center}>
               <div
                  className={`${styles.textboxBorder} ${styles.correctDisplay}`}
               >
                  {createDisplayText(hangMan.word, hangMan.correctGuesses)}
               </div>
            </h3>
         </div>
      </>
   );
}
