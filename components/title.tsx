import styles from "../styles/title.module.css";

export default function Title() {
   return (
      <div>
         <h1 className={styles.title}>
            Pokémon <div className={styles.mobileDiv} />
            Geng-man
         </h1>
         <h2 className={styles.subtitle}>A Pokémon Hangman Game</h2>
      </div>
   );
}
