import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import clsx from "clsx";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <div className={styles.btns}>
        <Link to="/table/" className={clsx(styles.btn, "button")}>
          {t("Pokemon list")}
        </Link>
        <Link to="/table/pokecenter/" className={clsx(styles.btn, "button")}>
          {t("Pokecenter")}
        </Link>
      </div>
      <LangSwitcher />
    </div>
  );
};
