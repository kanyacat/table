import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ICustomPokemon } from "../../types/types";
import styles from "./Card.module.css";
import clsx from "clsx";
import Pokeball from "../../assets/pokeball.png";
import { optionsType } from "../OptionsTypes/OptionsTypes";

interface IProps
  extends ICustomPokemon,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  className?: string;
}

export const Card = (props: IProps) => {
  const { name, type, description, picture, className } = props;

  return (
    <div id="card" className={clsx(styles.root, className)}>
      <img
        className={styles.img}
        src={picture ? picture : Pokeball}
        alt={name}
      />
      <p className={styles.name}> {name}</p>
      <div className={styles.description}>
        <div className={styles.type}>
          <span className={styles.type__icon}>
            {optionsType[type.name.toLowerCase()]}
          </span>
          <p className={clsx(styles.type__name, styles.text)}> {type.name}</p>
        </div>
        {description && (
          <p className={clsx(styles.text, styles.descr)}>{description}</p>
        )}
      </div>
    </div>
  );
};
