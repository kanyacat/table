import { useState } from "react";
import styles from "./CreatePokemonPage.module.css";
import clsx from "clsx";
import "tippy.js/dist/tippy.css";
import "../../../../index.css";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { IError, IFormData } from "../../../../types/types";
import { onValidate } from "../../../../helpers/validate";
import { Loader } from "../../../../components/Loader/Loader";
import { PokemonForm } from "./PokemonForm/PokemonForm";
import { Modal } from "../../../../components/Modal/Modal";
import { useTranslation } from "react-i18next";

export const CreatePokemonPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormData>({
    types: [],
    id: "",
    name: "",
    description: "",
    file: "",
  });

  const [isError, setIsError] = useState<IError>({
    type: "",
    id: "",
    name: "",
    file: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    onValidate(formData.types, formData.id, formData.name, isError, setIsError);

    if (!isError.id && !isError.name && !isError.type) {
      setIsLoading(true);
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem("pokemons") || "[]");
        localStorage.setItem(
          "pokemons",
          JSON.stringify([
            ...data,
            {
              types: formData.types,
              id: formData.id,
              name: formData.name,
              description: formData.description,
              picture: formData.file,
            },
          ])
        );
        setIsSuccess(true);
        clearForm();
        setIsLoading(false);
      }, 1000);

      setTimeout(() => {
        setIsSuccess(false);
        navigate("/table/pokecenter");
      }, 2000);
    }
  };

  const clearForm = () => {
    setFormData({
      description: "",
      file: "",
      id: "",
      name: "",
      types: [],
    });
    localStorage.setItem("img", "");
  };

  if (isLoading) {
    return (
      <section className={styles.root}>
        <div className={styles.loader}>
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.root}>
      <PokemonForm
        formData={formData}
        setFormData={(prev) => setFormData(prev)}
        isError={isError}
        setIsError={(prev) => setIsError(prev)}
        isEdit={false}
      />
      <div className={styles.btns}>
        <Link to="/table/pokecenter" className={clsx(styles.close)}>
          {t("Back")}
        </Link>
        <button className={styles.add} onClick={onSubmit}>
          {t("Add")}
        </button>
      </div>
      {isSuccess &&
        createPortal(
          <Modal>
            <p>{t("Pokemon has been successfully added to the pokecenter!")}</p>
          </Modal>,
          document.body
        )}
    </section>
  );
};
