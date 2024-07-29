import { useState } from "react";
import { PokemonForm } from "../../../features/pokecenter/createPokemon/CreatePokemonPage/PokemonForm/PokemonForm";
import styles from "./Edit.module.css";
import { ICustomPokemon, IError, IFormData } from "../../../types/types";
import { ICardProps } from "../Card";
import clsx from "clsx";
import { onValidate } from "../../../helpers/validate";
import { Loader } from "../../Loader/Loader";
import { useTranslation } from "react-i18next";
interface IEditProps extends Omit<ICardProps, "picture"> {
  file: string;
  setEditIsOpen: () => void;
  setPokemons: React.Dispatch<React.SetStateAction<ICustomPokemon[]>>;
}

export const Edit = (props: IEditProps) => {
  const { id, name, types, description, file, setEditIsOpen, setPokemons } =
    props;

  const { t } = useTranslation();

  const [editData, setEditData] = useState<IFormData>({
    types,
    id,
    name,
    description,
    file,
  });

  const [isError, setIsError] = useState<IError>({
    type: "",
    id: "",
    name: "",
    file: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    onValidate(editData.types, null, editData.name, isError, setIsError, name);

    if (!isError.id && !isError.name && !isError.type) {
      setIsLoading(true);
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem("pokemons") || "[]");

        const findPokemon = data.find((obj: ICustomPokemon) => obj.id === id);

        findPokemon.name = editData.name;
        findPokemon.types = editData.types;
        findPokemon.description = editData.description;
        findPokemon.picture = editData.file;

        localStorage.setItem("pokemons", JSON.stringify([...data]));
        setPokemons(JSON.parse(localStorage.getItem("pokemons") || "[]"));
        setIsLoading(false);
        setEditIsOpen();
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.root}>
        <div className={styles.loader}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <PokemonForm
        formData={editData}
        setFormData={setEditData}
        isError={isError}
        setIsError={(prev) => setIsError(prev)}
        isEdit={true}
        prevName={name}
      />
      <div className={styles.btns}>
        <button
          className={clsx(styles.back, styles.btn)}
          onClick={setEditIsOpen}
        >
          {t("Back")}
        </button>
        <button className={clsx(styles.save, styles.btn)} onClick={onSubmit}>
          {t("Save")}
        </button>
      </div>
    </div>
  );
};
