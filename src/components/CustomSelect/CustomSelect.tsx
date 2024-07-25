import { Dispatch, SetStateAction, useRef, useState } from "react";
import "./CustomSelect.css";
import clsx from "clsx";
import { IOptions } from "../../types/types";
import { options } from "../../configs/optionsTypesConfig";
//@ts-ignore
import Minus from "../../assets/minus.svg?react";
//@ts-ignore
import Plus from "../../assets/plus.svg?react";
import { optionsType } from "../OptionsTypes/OptionsTypes";

interface IProps {
  setTypes: Dispatch<SetStateAction<IOptions[]>>;
  error: string;
  types?: IOptions[];
  id: number;
  validate: () => void;
  removeSelect: (e: MouseEvent) => void;
  addSelect: (e: MouseEvent) => void;
  selects: {
    id: number;
  }[];
}

export const CustomSelect = (props: IProps) => {
  const {
    types,
    setTypes,
    error,
    validate,
    removeSelect,
    addSelect,
    selects,
    id,
  } = props;

  const [showOptions, setShowOptions] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);

  const [type, setType] = useState<IOptions>(types[id] ? types[id] : undefined);

  const optionsRef = useRef(null);

  const closeOpenOptions = (e: MouseEvent) => {
    //@ts-ignore
    if (showOptions && !optionsRef.current?.contains(e.target)) {
      setShowOptions(false);
    }
  };

  document.addEventListener("mousedown", closeOpenOptions);

  const handleSelect = (option: IOptions) => {
    if (type && types) {
      setType(option);

      setTypes(
        //удаляет первое встреченное значение
        types.filter(
          (item, index) =>
            item.name !== type?.name || types.indexOf(item) !== index
        )
      );

      setTypes((prev) => [...prev, option]);
    } else {
      setType(option);
      setTypes((prev) => [...prev, option]);
    }

    setShowOptions(false);
  };

  const handleAddSelectClick = (e: MouseEvent) => {
    e.preventDefault();
    addSelect(e);
  };

  const handleRemoveSelectClick = (e: MouseEvent) => {
    e.preventDefault();
    if (types) {
      setTypes(
        types.filter(
          (item, index) =>
            item.name !== type?.name || types.indexOf(item) !== index
        )
      );
    }

    removeSelect(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      setFocusedOptionIndex((prevIndex) => (prevIndex + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      setFocusedOptionIndex(
        (prevIndex) => (prevIndex - 1 + options.length) % options.length
      );
    } else if (e.key === "Enter" && focusedOptionIndex >= 0) {
      handleSelect(options[focusedOptionIndex]);
    }
  };

  return (
    <div className="root">
      <div className={"error__container"}>
        <div className="selector">
          <Minus
            className={"remove__btn"}
            onClick={
              selects.length > 1
                ? (e: MouseEvent) => handleRemoveSelectClick(e)
                : () => {}
            }
          />

          <div
            id="type"
            className={clsx("select")}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onBlur={validate}
          >
            <div
              className={clsx(
                `box ${showOptions ? "show" : ""}`,
                error ? "input__error" : ""
              )}
              onClick={() => setShowOptions(!showOptions)}
            >
              {type ? (
                <p className={"type"}>
                  <span className="icon">
                    {optionsType[type.name.toLowerCase()]}
                  </span>
                  {type?.name}
                </p>
              ) : (
                "Select type"
              )}
            </div>
          </div>
          <Plus
            className={"add__btn"}
            onClick={
              selects.length < 3
                ? (e: MouseEvent) => handleAddSelectClick(e)
                : () => {}
            }
          />
          <ul
            ref={optionsRef}
            className={`options ${showOptions ? "show" : ""}`}
          >
            {options.map((option, index) => (
              <li
                tabIndex={0}
                key={index}
                className={`option ${
                  index === focusedOptionIndex ? "focused" : ""
                }`}
                onClick={() => handleSelect(option)}
                onBlur={validate}
              >
                <p className={"type"}>
                  <span className="icon">{option.icon}</span>
                  {option.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
