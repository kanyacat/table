import { useState } from "react";
import { PokemonForm } from "../../../features/pokecenter/createPokemon/CreatePokemonPage/PokemonForm/PokemonForm";
import styles from "./Edit.module.css";
import { ICustomPokemon, IError, IOptions } from "../../../types/types";
import { ICardProps } from "../Card";
import clsx from "clsx";
import { onValidate } from "../../../helpers/validate";
import { Loader } from "../../Loader/Loader";
import { createPortal } from "react-dom";
import { Modal } from "../../Modal/Modal";

interface IEditProps extends ICardProps {
  setEditIsOpen: () => void;
}

export const Edit = (props: IEditProps) => {
  const { id, name, types, description, picture, setEditIsOpen } = props;

  //данные формы
  const [editTypes, setEditTypes] = useState<IOptions[]>(types);
  const [editId, setEditId] = useState(id);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editFile, setEditFile] = useState(picture);

  const [isError, setIsError] = useState<IError>({
    type: "",
    id: "",
    name: "",
    file: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    onValidate(editTypes, null, editName, isError, setIsError, name);

    if (!isError.id && !isError.name && !isError.type) {
      setIsLoading(true);
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem("pokemons") || "[]");

        const findPokemon = data.find((obj: ICustomPokemon) => obj.id === id);

        findPokemon.name = editName;
        findPokemon.types = editTypes;
        findPokemon.description = editDescription;
        findPokemon.picture = editFile;

        localStorage.setItem("pokemons", JSON.stringify([...data]));
        setIsSuccess(true);
        setIsLoading(false);
      }, 1000);

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.root}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <PokemonForm
            types={editTypes}
            file={editFile}
            id={editId}
            name={editName}
            description={editDescription}
            isError={isError}
            setTypes={(prev) => setEditTypes(prev)}
            setId={(prev) => setEditId(prev)}
            setName={(prev) => setEditName(prev)}
            setDescription={(prev) => setEditDescription(prev)}
            setFile={(prev) => setEditFile(prev)}
            setIsError={(prev) => setIsError(prev)}
            isEdit={true}
            prevName={name}
          />
          <div className={styles.btns}>
            <button
              className={clsx(styles.back, styles.btn)}
              onClick={setEditIsOpen}
            >
              Back
            </button>
            <button
              className={clsx(styles.save, styles.btn)}
              onClick={onSubmit}
            >
              Save
            </button>
          </div>
        </>
      )}
      {isSuccess &&
        createPortal(
          <Modal>
            <p> Данные покемона были успешно обновлены!</p>
            <p>Перезагрузите страницу, чтобы изменения вступили в силу.</p>
          </Modal>,
          document.body
        )}
    </div>
  );
};
