import { IFormData, IOptions } from "../../types/types";
import { optionsType } from "../OptionsTypes/OptionsTypes";
import styles from "./Chip.module.css";
//@ts-ignore
import Delete from "../../assets/close.svg?react";
import { useTranslation } from "react-i18next";

interface IChipProps {
  type: IOptions;
  types: IOptions[];
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export const Chip = ({ type, types, setFormData, formData }: IChipProps) => {
  const { t } = useTranslation();

  const handleRemoveSelectClick = (e: MouseEvent) => {
    e.preventDefault();

    setFormData({
      ...formData,
      types: types.filter(
        (item, index) =>
          item.name !== type?.name || types.indexOf(item) !== index
      ),
    });
  };

  return (
    <div className={styles.root}>
      <span className={styles.icon}>
        {optionsType[type.name.toLowerCase()]}
      </span>
      <p className={styles.name}>{t(`${type.name.toLowerCase()}`)}</p>
      <Delete className={styles.delete} onClick={handleRemoveSelectClick} />
    </div>
  );
};
