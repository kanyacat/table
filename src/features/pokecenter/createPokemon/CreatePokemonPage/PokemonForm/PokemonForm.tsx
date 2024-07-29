import React, { useEffect } from "react";
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
import { IError, IFormData } from "../../../../../types/types";
import placeholder from "../../../../../assets/placeholder.png";
import { Chip } from "../../../../../components/Chip/Chip";
import { useTranslation } from "react-i18next";

interface IPokemonForm {
  formData: IFormData;
  isError: IError;
  setIsError: React.Dispatch<React.SetStateAction<IError>>;
  isEdit: boolean;
  prevName?: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export const PokemonForm = (props: IPokemonForm) => {
  const { formData, setFormData, isError, setIsError, isEdit, prevName } =
    props;

  const { t } = useTranslation();

  useEffect(() => {
    setFormData({ ...formData, file: formData.file });
    localStorage.setItem("img", "");
  }, []);

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      validateFile(file, isError, setIsError);

      if (!isError.file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          localStorage.setItem("img", reader.result as string);
          setFormData({ ...formData, file: localStorage.getItem("img") || "" });
        };
      }
    }
  };

  const deleteImgHandler = () => {
    setFormData({ ...formData, file: "" });
    localStorage.setItem("img", "");
  };

  return (
    <form action="submit" className={styles.form}>
      <div className={styles.selects}>
        <label className={styles.label} htmlFor="type">
          {t("Type")}
          <span>*</span>
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
        <div className={styles.selects}>
          <CustomSelect
            error={isError?.type ? isError.type : ""}
            setFormData={(prev) => setFormData(prev)}
            types={formData.types}
            validate={() => validateType(formData.types, isError, setIsError)}
          />
        </div>
        <p className={styles.validate__descr}>
          {t("A maximum of 3 types can be selected.")}
        </p>
        {formData?.types.map((type, index) => {
          return (
            <Chip
              key={index}
              type={type}
              types={formData.types}
              formData={formData}
              setFormData={(prev) => setFormData(prev)}
            />
          );
        })}
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
            value={formData.id
              ?.toString()
              .replace(/(\d{3}(?=(?:\d)))/g, "$1" + "-")}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              setFormData({
                ...formData,
                id: e.currentTarget.value.replace(/\D+/g, ""),
              })
            }
            placeholder="XXX-XXX-XXX"
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            onBlur={() => validateId(formData.id, isError, setIsError)}
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
          {t("The ID must be unique and consist of 9 digits.")}
        </p>

        <label className={styles.label} htmlFor="name">
          {t("Name")}
          <span>*</span>
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={() =>
              validateName(formData.name, isError, setIsError, prevName)
            }
            type="text"
            maxLength={20}
          />
        </div>
        <p className={styles.validate__descr}>
          {t("The name must be unique up to 20 Latin letters.")}
        </p>

        <label className={styles.label} htmlFor="">
          {t("Description")}
        </label>
        <textarea
          className={clsx(styles.input, styles.textarea)}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          maxLength={250}
        />
        <p className={styles.validate__descr}>
          {t("The length of the description should not exceed 250 characters.")}
        </p>
      </div>
      <div className={styles.input__img}>
        {isError?.file && <p className={styles.error}>{isError?.file}</p>}
        <label className={styles.label__file} htmlFor="file">
          <img
            className={styles.img}
            src={formData.file ? formData.file : placeholder}
            alt={"pokemon image"}
          />
        </label>
        <p className={styles.validate__descr}>
          {t("Only images up to 2 MB are allowed.")}
        </p>
        <input
          id="file"
          className={styles.file}
          type="file"
          onChange={fileHandler}
          accept="image/png, image/jpeg"
        />
        {formData.file && (
          <button onClick={deleteImgHandler} className={styles.btn}>
            {t("Delete picture")}
          </button>
        )}
      </div>
    </form>
  );
};
