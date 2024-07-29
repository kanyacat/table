import React from "react";
import { useTranslation } from "react-i18next";

export const LangSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguageHandler = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ru" : "en");
    localStorage.setItem("language", i18n.language);
  };

  return (
    <div>
      <button onClick={changeLanguageHandler}>{t("language")}</button>
    </div>
  );
};
