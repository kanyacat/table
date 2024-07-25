import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { ICustomPokemon } from "../../types/types";
import styles from "./Card.module.css";
import clsx from "clsx";
import Pokeball from "../../assets/pokeball.png";
import { optionsType } from "../OptionsTypes/OptionsTypes";
import { createPortal } from "react-dom";
import { Edit } from "./Edit/Edit";
//@ts-ignore
import Pencil from "../../assets/pencil.svg?react";
//@ts-ignore
import Close from "../../assets/close.svg?react";

export interface ICardProps
  extends ICustomPokemon,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  className?: string;
}

export const Card = (props: ICardProps) => {
  const { id, name, types, description, picture, className } = props;

  const [editIsOpen, setEditIsOpen] = useState(false);

  const handleEditPokemon = () => {
    setEditIsOpen(true);
  };

  const handleDeletePokemon = () => {};

  return (
    <div id="card" className={clsx(styles.root, className)}>
      <Close onClick={handleDeletePokemon} className={styles.delete} />
      <img
        className={styles.img}
        src={picture ? picture : Pokeball}
        alt={name}
      />
      <div className={styles.title} onClick={handleEditPokemon}>
        <p className={styles.name}>{name}</p>
        <Pencil className={styles.edit} />
      </div>
      <div className={styles.description}>
        <div className={styles.type}>
          {types?.map((type) => {
            return (
              <div key={type.name}>
                <span className={styles.type__icon}>
                  {optionsType[type.name.toLowerCase()]}
                </span>
                <p className={clsx(styles.type__name, styles.text)}>
                  {type.name}
                </p>
              </div>
            );
          })}
        </div>
        {description && (
          <p className={clsx(styles.text, styles.descr)}>{description}</p>
        )}
      </div>
      {editIsOpen &&
        createPortal(
          <Edit
            id={id}
            name={name}
            types={types}
            description={description}
            picture={picture}
            setEditIsOpen={() => setEditIsOpen(false)}
          />,
          document.body
        )}
    </div>
  );
};
