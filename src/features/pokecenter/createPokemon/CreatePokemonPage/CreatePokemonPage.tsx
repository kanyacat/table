import { useState } from "react";
import styles from "./CreatePokemonPage.module.css";
import clsx from "clsx";
import "tippy.js/dist/tippy.css";
import "../../../../index.css";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { IError, IOptions } from "../../../../types/types";
import { onValidate } from "../../../../helpers/validate";
import { Loader } from "../../../../components/Loader/Loader";
import { PokemonForm } from "./PokemonForm/PokemonForm";
import { Modal } from "../../../../components/Modal/Modal";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export const CreatePokemonPage = () => {
  const { t } = useTranslation();

  //данные формы
  const [types, setTypes] = useState<IOptions[]>([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const [isError, setIsError] = useState<IError>({
    type: "",
    id: "",
    name: "",
    file: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    onValidate(types, id, name, isError, setIsError);

    if (!isError.id && !isError.name && !isError.type) {
      setIsLoading(true);
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem("pokemons") || "[]");
        localStorage.setItem(
          "pokemons",
          JSON.stringify([
            ...data,
            {
              types,
              id,
              name,
              description,
              picture: file,
            },
          ])
        );
        setIsSuccess(true);
        clearForm();
        setIsLoading(false);
      }, 1000);

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
  };

  const clearForm = () => {
    setTypes([]);
    setFile("");
    localStorage.setItem("img", "");
    setId("");
    setName("");
    setDescription("");
  };

  return (
    <section className={styles.root}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <PokemonForm
          types={types}
          id={id}
          name={name}
          description={description}
          file={file}
          setTypes={(prev) => setTypes(prev)}
          setId={(prev) => setId(prev)}
          setName={(prev) => setName(prev)}
          setDescription={(prev) => setDescription(prev)}
          setFile={(prev) => setFile(prev)}
          isError={isError}
          setIsError={(prev) => setIsError(prev)}
          isEdit={false}
        />
      )}
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
