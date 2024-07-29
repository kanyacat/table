import { ICustomPokemon, IError, IOptions } from "../types/types";
import { hasDuplicates } from "./hasDuplicates";
import i18next from "i18next";

export const onValidate = (
  types: IOptions[] | [],
  id: string | undefined | null,
  name: string | undefined,
  isError: IError,
  setIsError: React.Dispatch<React.SetStateAction<IError>>,
  prevName?: string | undefined
) => {
  validateType(types, isError, setIsError);
  id !== null && validateId(id, isError, setIsError);
  validateName(name, isError, setIsError, prevName);
};

export const validateType = (
  types: IOptions[] | [],
  isError: IError,
  setIsError: React.Dispatch<React.SetStateAction<IError>>
) => {
  if (types?.length == 0) {
    setIsError({
      id: isError.id,
      name: isError.name,
      type: (isError.type = i18next.t("Select the type")),
      file: isError.file,
    });
    return;
  }

  if (hasDuplicates<IOptions>(types)) {
    setIsError({
      id: isError.id,
      name: isError.name,
      type: (isError.type = i18next.t(
        "The selected types should not be repeated"
      )),
      file: isError.file,
    });
    return;
  }

  setIsError({
    id: isError.id,
    name: isError.name,
    type: (isError.type = ""),
    file: isError.file,
  });
};

export const validateId = (
  id: string | undefined,
  isError: IError,
  setIsError: React.Dispatch<React.SetStateAction<IError>>
) => {
  const data: [] = JSON.parse(localStorage.getItem("pokemons") || "[]");

  if (!id) {
    setIsError({
      id: (isError.id = i18next.t("Enter the ID")),
      name: isError.name,
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (/^([0-9]{9})?$/.test(id) === false) {
    setIsError({
      id: (isError.id = i18next.t("The ID must contain 9 characters")),
      name: isError.name,
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (data?.some((d: ICustomPokemon) => d.id === id)) {
    setIsError({
      id: (isError.id = i18next.t("The ID must be unique")),
      name: isError.name,
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  setIsError({
    id: (isError.id = ""),
    name: isError.name,
    type: isError.type,
    file: isError.file,
  });
};

export const validateName = (
  name: string | undefined,
  isError: IError,
  setIsError: React.Dispatch<React.SetStateAction<IError>>,
  prevName?: string | undefined
) => {
  const data: [] = JSON.parse(localStorage.getItem("pokemons") || "[]");

  if (!name) {
    setIsError({
      id: isError.id,
      name: (isError.name = i18next.t("Enter the name of the Pokemon")),
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (/^[a-zA-Z ]+$/.test(name) === false) {
    setIsError({
      id: isError.id,
      name: (isError.name = i18next.t(
        "The name should consist only of Latin letters"
      )),
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (name[0] !== name[0].toUpperCase()) {
    setIsError({
      id: isError.id,
      name: (isError.name = i18next.t(
        "The name must begin with a capital letter"
      )),
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (data?.some((d: ICustomPokemon) => d.name === name) && name !== prevName) {
    setIsError({
      id: isError.id,
      name: (isError.name = i18next.t("The name must be unique")),
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  setIsError({
    id: isError.id,
    name: (isError.name = ""),
    type: isError.type,
    file: isError.file,
  });
};

export const validateFile = (
  file: File,
  isError: IError,
  setIsError: React.Dispatch<React.SetStateAction<IError>>
) => {
  const imgType =
    file.type == "image/jpeg" ? true : file.type == "image/png" ? true : false;

  if (!imgType) {
    setIsError({
      id: isError.id,
      name: isError.name,
      type: isError.type,
      file: (isError.file = i18next.t("The file is not a picture")),
    });
    return;
  }

  if (file.size > 2097152) {
    setIsError({
      id: isError.id,
      name: isError.name,
      type: isError.type,
      file: (isError.file = i18next.t("The file size exceeds 2 MB")),
    });
    return;
  }
  setIsError({
    id: isError.id,
    name: isError.name,
    type: isError.type,
    file: (isError.file = ""),
  });
};
