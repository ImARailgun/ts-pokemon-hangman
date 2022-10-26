import { saveType } from "../logic/save";
import styles from "../styles/footer.module.css";

type Props = {
   save: saveType;
};

export default function Footer({ save }: Props) {
   return (
      <div className={`${styles.footer} ${styles.textboxBorder}`}>
         {save.password && <div>| Profile: {save.password} |</div>}{" "}
         <div>| Wins: {save.wins} |</div>{" "}
         <div>| Current Streak: {save.curStreak} |</div>
         <div>| Highest Streak: {save.highStreak} |</div>
      </div>
   );
}
