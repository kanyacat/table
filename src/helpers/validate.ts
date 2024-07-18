import { ICustomPokemon, IError, IOptions } from "../types/types";

export const onValidate = (
  type: IOptions | undefined,
  id: string | undefined,
  name: string | undefined,
  isError: IError,
  setIsError: React.Dispatch<React.SetStateAction<IError>>
) => {
  validateType(type, isError, setIsError);
  validateId(id, isError, setIsError);
  validateName(name, isError, setIsError);
};

export const validateType = (
  type: IOptions | undefined,
  isError: IError,
  setIsError: React.Dispatch<React.SetStateAction<IError>>
) => {
  if (!type) {
    setIsError({
      id: isError.id,
      name: isError.name,
      type: (isError.type = "Выберите тип"),
      file: isError.file,
    });
  } else {
    setIsError({
      id: isError.id,
      name: isError.name,
      type: (isError.type = ""),
      file: isError.file,
    });
  }
};

export const validateId = (
  id: string | undefined,
  isError: IError,
  setIsError: React.Dispatch<React.SetStateAction<IError>>
) => {
  const data: [] = JSON.parse(localStorage.getItem("pokemons") || "[]");

  if (!id) {
    setIsError({
      id: (isError.id = "Введите ID"),
      name: isError.name,
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (/^([0-9]{9})?$/.test(id) === false) {
    setIsError({
      id: (isError.id = "ID должен содержать 9 символов"),
      name: isError.name,
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (data?.some((d: ICustomPokemon) => d.id === id)) {
    setIsError({
      id: (isError.id = "ID должен быть уникальным"),
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
  setIsError: React.Dispatch<React.SetStateAction<IError>>
) => {
  const data: [] = JSON.parse(localStorage.getItem("pokemons") || "[]");

  if (!name) {
    setIsError({
      id: isError.id,
      name: (isError.name = "Введите имя покемона"),
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (/^[a-zA-Z ]+$/.test(name) === false) {
    setIsError({
      id: isError.id,
      name: (isError.name = "Имя должно состоять только из латинских букв"),
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (name[0] !== name[0].toUpperCase()) {
    setIsError({
      id: isError.id,
      name: (isError.name = "Имя должно начинаться с заглавной буквы"),
      type: isError.type,
      file: isError.file,
    });
    return;
  }

  if (data?.some((d: ICustomPokemon) => d.name === name)) {
    setIsError({
      id: isError.id,
      name: (isError.name = "Имя должно быть уникальным"),
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
      file: (isError.file = "Файл не является картинкой"),
    });
    return;
  }

  if (file.size > 2097152) {
    setIsError({
      id: isError.id,
      name: isError.name,
      type: isError.type,
      file: (isError.file = "Размер файла превышает 2 MB"),
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
