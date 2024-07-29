import { IOptions } from "../../types/types";
import { optionsType } from "../OptionsTypes/OptionsTypes";
import styles from "./Chip.module.css";
//@ts-ignore
import Delete from "../../assets/close.svg?react";
import { useTranslation } from "react-i18next";

interface IChipProps {
  value: IOptions;
  types: IOptions[];
  setTypes: React.Dispatch<React.SetStateAction<IOptions[]>>;
}

export const Chip = ({ value, types, setTypes }: IChipProps) => {
  const { t } = useTranslation();

  const handleRemoveSelectClick = (e: MouseEvent) => {
    e.preventDefault();

    setTypes(
      types.filter(
        (item, index) =>
          item.name !== value?.name || types.indexOf(item) !== index
      )
    );
  };

  return (
    <div className={styles.root}>
      <span className={styles.icon}>
        {optionsType[value.name.toLowerCase()]}
      </span>
      <p className={styles.name}>{t(`${value.name.toLowerCase()}`)}</p>
      <Delete className={styles.delete} onClick={handleRemoveSelectClick} />
    </div>
  );
};
