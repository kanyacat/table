import { useState } from "react";
import "./CustomSelect.css";
import clsx from "clsx";
import { IOptions } from "../../types/types";
import { options } from "../../configs/optionsTypesConfig";
import Tippy from "@tippyjs/react";

interface IProps {
  setType: (type: IOptions) => void;
  error: string;
  type?: IOptions;
  validate: () => void;
}

export const CustomSelect = (props: IProps) => {
  const { type, setType, error, validate } = props;

  const [showOptions, setShowOptions] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);

  const handleSelect = (option: IOptions) => {
    setType(option);
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
    <div className="root">
      <label className="label" htmlFor="type">
        Type<span>*</span>
      </label>
      <div className={"error__container"}>
        {error && (
          <Tippy placement="bottom-end" arrow="" theme="error" content={error}>
            <div className={clsx("tippy__error", "button__error")}>!</div>
          </Tippy>
        )}

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
                <span className="icon">{type.icon}</span>
                {type.name}
              </p>
            ) : (
              "Select type"
            )}
          </div>
          <ul className={`options ${showOptions ? "show" : ""}`}>
            {options.map((option, index) => (
              <li
                tabIndex={0}
                key={index}
                className={`option ${
                  index === focusedOptionIndex ? "focused" : ""
                }`}
                onClick={() => handleSelect(option)}
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
