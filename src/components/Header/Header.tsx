import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import clsx from "clsx";

export const Header = () => {
  return (
    <div className={styles.btns}>
      <Link to="/table/" className={clsx(styles.btn, "button")}>
        Pokemon list
      </Link>
      <Link to="/table/pokecenter/" className={clsx(styles.btn, "button")}>
        Pokecenter
      </Link>
    </div>
  );
};
