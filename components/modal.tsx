import styles from "../styles/modal.module.css";

type Props = {
   resetGame: () => void;
   returnToSelectGens: () => void;
   word: string;
   gameOver: string;
};

export default function Modal({
   resetGame,
   returnToSelectGens,
   word,
   gameOver,
}: Props) {
   const endingText =
      gameOver === "win"
         ? "Congratulations! You escaped Gengar!"
         : `Oh no! Gengar caught you! (${word})`;

   return (
      <div className={styles.modal}>
         <div className={styles.box}>
            {endingText}&nbsp;
            <button
               type="button"
               onClick={resetGame}
               className={styles.buttonFont}
            >
               Play Again ?
            </button>
            &nbsp;
            <button
               type="button"
               onClick={returnToSelectGens}
               className={styles.buttonFont}
            >
               Change Regions ?
            </button>
            &nbsp;
            <i />
         </div>
      </div>
   );
}
