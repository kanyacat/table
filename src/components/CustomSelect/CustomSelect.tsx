import { Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "./CustomSelect.module.css";
import clsx from "clsx";
import { IOptions } from "../../types/types";
import { options } from "../../configs/optionsTypesConfig";
import { optionsType } from "../OptionsTypes/OptionsTypes";

interface IProps {
  setTypes: Dispatch<SetStateAction<IOptions[]>>;
  error: string;
  types?: IOptions[];
  validate: () => void;
  id?: number;
}

export const CustomSelect = (props: IProps) => {
  const { types, setTypes, error, validate, id } = props;

  const [showOptions, setShowOptions] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);

  const typeId = types && id ? types[id] : undefined;

  const [type] = useState<IOptions | undefined>(typeId ? typeId : undefined);

  const optionsRef = useRef(null);

  const closeOpenOptions = (e: MouseEvent) => {
    //@ts-ignore
    if (showOptions && !optionsRef.current?.contains(e.target)) {
      setShowOptions(false);
    }
  };

  document.addEventListener("mousedown", closeOpenOptions);

  const handleSelect = (option: IOptions) => {
    setTypes((prev) => [...prev, option]);
    setShowOptions(false);
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
    <div className={styles.root}>
      <div className={styles.error__container}>
        <div className={styles.selector}>
          <div
            id="type"
            className={clsx(styles.select)}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onBlur={validate}
          >
            <div
              className={clsx(
                `${styles.box} ${showOptions ? styles.show : ""}`,
                error ? styles.input__error : ""
              )}
              onClick={() => setShowOptions(!showOptions)}
            >
              {type ? (
                <p className={styles.type}>
                  <span className={styles.icon}>
                    {optionsType[type.name.toLowerCase()]}
                  </span>
                  {type?.name}
                </p>
              ) : (
                <p>Select type</p>
              )}
            </div>
          </div>
          <ul
            ref={optionsRef}
            className={`${styles.options} ${showOptions ? styles.show : ""}`}
          >
            {options.map((option, index) => (
              <li
                tabIndex={0}
                key={index}
                className={`${styles.option} ${
                  index === focusedOptionIndex ? styles.focused : ""
                }`}
                onClick={
                  types
                    ? types?.length < 3
                      ? () => handleSelect(option)
                      : () => {}
                    : () => handleSelect(option)
                }
                onBlur={validate}
              >
                <p className={styles.type}>
                  <span className={styles.icon}>{option.icon}</span>
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
