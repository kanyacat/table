import React, { SetStateAction, useEffect, useState } from "react";
import { generatorUniqueId } from "../../../../../helpers/generateId";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import { CustomSelect } from "../../../../../components/CustomSelect/CustomSelect";
import {
  validateFile,
  validateId,
  validateName,
  validateType,
} from "../../../../../helpers/validate";
import "tippy.js/dist/tippy.css";
import "../../../../../index.css";
import styles from "./PokemonForm.module.css";
import { IError, IOptions } from "../../../../../types/types";
import placeholder from "../../../../../assets/placeholder.png";

interface IPokemonForm {
  types: IOptions[];
  id: string;
  name: string;
  description: string;
  file: string;
  setTypes: React.Dispatch<React.SetStateAction<IOptions[]>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<string>>;
  isError: IError;
  setIsError: React.Dispatch<React.SetStateAction<IError>>;
  isEdit: boolean;
  prevName?: string;
}

export const PokemonForm = (props: IPokemonForm) => {
  const {
    types,
    id,
    name,
    description,
    file,
    setTypes,
    setId,
    setName,
    setDescription,
    setFile,
    isError,
    setIsError,
    isEdit,
    prevName,
  } = props;

  useEffect(() => {
    setFile(file);
    localStorage.setItem("img", "");
  }, []);

  const [selects, setSelects] = useState([{ id: 0 }]); // начальное состояние с одним инпутом

  useEffect(() => {
    let selects = [];

    selects = types.map((t, i) => {
      return { id: i };
    });

    setSelects(selects.length > 0 ? selects : [{ id: 0 }]);
  }, []);

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

  const deleteImgHandler = () => {
    setFile("");
    localStorage.setItem("img", "");
  };

  return (
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
              setTypes={(prev: SetStateAction<IOptions[]>) => setTypes(prev)}
              types={types}
              validate={() => validateType(types, isError, setIsError)}
              addSelect={(e: MouseEvent) => handleAddSelect(e)}
              removeSelect={(e: MouseEvent) => handleRemoveSelect(e, select.id)}
              selects={selects}
              id={select.id}
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
              <div className={clsx(styles.tippy__error, styles.button__error)}>
                !
              </div>
            </Tippy>
          )}
          <input
            id="id"
            value={id?.toString().replace(/(\d{3}(?=(?:\d)))/g, "$1" + "-")}
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
            disabled={isEdit}
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
              <div className={clsx(styles.tippy__error, styles.button__error)}>
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
            onBlur={() => validateName(name, isError, setIsError, prevName)}
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
            src={file ? file : placeholder}
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
        {file && (
          <button onClick={deleteImgHandler} className={styles.btn}>
            Удалить изображение
          </button>
        )}
      </div>
    </form>
  );
};
