import { SetStateAction, useEffect, useState } from "react";
import styles from "./CreatePokemonPage.module.css";
import placeholder from "../../../../assets/placeholder.png";
import clsx from "clsx";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "../../../../index.css";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { IError, IOptions } from "../../../../types/types";
import {
  onValidate,
  validateFile,
  validateId,
  validateName,
  validateType,
} from "../../../../helpers/validate";
import { Loader } from "../../../../components/Loader/Loader";
import { CustomSelect } from "../../../../components/CustomSelect/CustomSelect";
import { generatorUniqueId } from "../../../../helpers/generateId";

export const CreatePokemonPage = () => {
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

  useEffect(() => {
    setFile("");
    imgUrl = "";
    localStorage.setItem("img", "");
  }, []);

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

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      validateFile(file, isError, setIsError);

      if (!isError.file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          localStorage.setItem("img", reader.result as string);
          setFile(localStorage.getItem("img") || "");
        };
      }
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

  let imgUrl = localStorage.getItem("img") || "";

  const [selects, setSelects] = useState([{ id: 1 }]); // начальное состояние с одним инпутом

  const handleAddSelect = (e: MouseEvent) => {
    e.preventDefault();
    const newSelect = { id: generatorUniqueId() };
    setSelects([...selects, newSelect]);
  };

  const handleRemoveSelect = (e: MouseEvent, id: number) => {
    e.preventDefault();

    const updatedInputs = selects.filter((input) => input.id !== id);
    setSelects(updatedInputs);
  };

  return (
    <section className={styles.root}>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <form action="submit" className={styles.form}>
          <div className={styles.selects}>
            <label className={styles.label} htmlFor="type">
              Type<span>*</span>
            </label>
            <div className={clsx(styles.error__container)}>
              {isError.type && (
                <Tippy
                  placement="bottom-end"
                  arrow=""
                  theme="error"
                  content={isError.type}
                >
                  <div
                    className={clsx(
                      styles.tippy__error,
                      styles.button__error,
                      styles.types__error
                    )}
                  >
                    !
                  </div>
                </Tippy>
              )}
            </div>

            {selects.map((select) => (
              <div key={select.id} className={styles.selects}>
                <CustomSelect
                  key={select.id}
                  error={isError?.type ? isError.type : ""}
                  setTypes={(prev: SetStateAction<IOptions[]>) =>
                    setTypes(prev)
                  }
                  types={types}
                  validate={() => validateType(types, isError, setIsError)}
                  addSelect={(e: MouseEvent) => handleAddSelect(e)}
                  removeSelect={(e: MouseEvent) =>
                    handleRemoveSelect(e, select.id)
                  }
                  selects={selects}
                />
              </div>
            ))}
            <p className={styles.validate__descr}>
              A maximum of 3 types can be selected.
            </p>
          </div>
          <div className={styles.center}>
            <label className={styles.label} htmlFor="id">
              ID<span>*</span>
            </label>
            <div className={styles.error__container}>
              {isError?.id && (
                <Tippy
                  placement="bottom-end"
                  arrow=""
                  theme="error"
                  content={isError?.id}
                >
                  <div
                    className={clsx(styles.tippy__error, styles.button__error)}
                  >
                    !
                  </div>
                </Tippy>
              )}
              <input
                id="id"
                value={id.toString().replace(/(\d{3}(?=(?:\d)))/g, "$1" + "-")}
                onKeyUp={() => setId(id.replace(/\D+/g, ""))}
                placeholder="XXX-XXX-XXX"
                onChange={(e) => setId(e.target.value)}
                onBlur={() => validateId(id, isError, setIsError)}
                className={clsx(
                  styles.input,
                  isError.id ? styles.input__error : ""
                )}
                type="tel"
                maxLength={11}
              />
            </div>

            <p className={styles.validate__descr}>
              The ID must be unique and consist of 9 digits.
            </p>

            <label className={styles.label} htmlFor="name">
              Name<span>*</span>
            </label>
            <div className={styles.error__container}>
              {isError?.name && (
                <Tippy
                  placement="bottom-end"
                  arrow=""
                  theme="error"
                  content={isError?.name}
                >
                  <div
                    className={clsx(styles.tippy__error, styles.button__error)}
                  >
                    !
                  </div>
                </Tippy>
              )}
              <input
                id="name"
                className={clsx(
                  styles.input,
                  isError?.name ? styles.input__error : ""
                )}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateName(name, isError, setIsError)}
                type="text"
                maxLength={20}
              />
            </div>
            <p className={styles.validate__descr}>
              The name must be unique up to 20 Latin letters.
            </p>

            <label className={styles.label} htmlFor="">
              Description
            </label>
            <textarea
              className={clsx(styles.input, styles.textarea)}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={250}
            />
            <p className={styles.validate__descr}>
              The length of the description should not exceed 250 characters.
            </p>
          </div>
          <div className={styles.input__img}>
            {isError?.file && <p className={styles.error}>{isError?.file}</p>}
            <label className={styles.label__file} htmlFor="file">
              <img
                className={styles.img}
                src={imgUrl ? imgUrl : placeholder}
                alt={"pokemon image"}
              />
            </label>
            <p className={styles.validate__descr}>
              Only images up to 2 MB are allowed.
            </p>
            <input
              id="file"
              className={styles.file}
              type="file"
              onChange={fileHandler}
              accept="image/png, image/jpeg"
            />
          </div>
        </form>
      )}

      <div className={styles.btns}>
        <Link to="/table/pokecenter" className={clsx(styles.close)}>
          Back
        </Link>
        <button className={styles.add} onClick={onSubmit}>
          Add
        </button>
      </div>
      {isSuccess &&
        createPortal(
          <p className={styles.modal}>
            Покемон был успешно добавлен в покецентр!
          </p>,
          document.body
        )}
    </section>
  );
};
