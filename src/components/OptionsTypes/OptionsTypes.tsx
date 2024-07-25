// @ts-nocheck
//он ругается на импорты, но с ними всё ок
import { ReactNode } from "react";
import Fire from "../../assets/pokemonTypes/fire.svg?react";
import Normal from "../../assets/pokemonTypes/normal.svg?react";
import Fighting from "../../assets/pokemonTypes/fighting.svg?react";
import Flying from "../../assets/pokemonTypes/flying.svg?react";
import Ground from "../../assets/pokemonTypes/ground.svg?react";
import Poison from "../../assets/pokemonTypes/poison.svg?react";
import Rock from "../../assets/pokemonTypes/rock.svg?react";
import Bug from "../../assets/pokemonTypes/bug.svg?react";
import Ghost from "../../assets/pokemonTypes/ghost.svg?react";
import Steel from "../../assets/pokemonTypes/steel.svg?react";
import Water from "../../assets/pokemonTypes/water.svg?react";
import Grass from "../../assets/pokemonTypes/grass.svg?react";
import Electric from "../../assets/pokemonTypes/electric.svg?react";
import Psychic from "../../assets/pokemonTypes/psychic.svg?react";
import Ice from "../../assets/pokemonTypes/ice.svg?react";
import Dragon from "../../assets/pokemonTypes/dragon.svg?react";
import Dark from "../../assets/pokemonTypes/dark.svg?react";
import Fairy from "../../assets/pokemonTypes/fairy.svg?react";
import styles from "./OptionsTypes.module.css";

export const optionsType: Record<string, ReactNode> = {
  fire: <Fire className={styles.icon} />,
  normal: <Normal className={styles.icon} />,
  fighting: <Fighting className={styles.icon} />,
  flying: <Flying className={styles.icon} />,
  ground: <Ground className={styles.icon} />,
  poison: <Poison className={styles.icon} />,
  rock: <Rock className={styles.icon} />,
  bug: <Bug className={styles.icon} />,
  ghost: <Ghost className={styles.icon} />,
  steel: <Steel className={styles.icon} />,
  water: <Water className={styles.icon} />,
  grass: <Grass className={styles.icon} />,
  electric: <Electric className={styles.icon} />,
  psychic: <Psychic className={styles.icon} />,
  ice: <Ice className={styles.icon} />,
  dragon: <Dragon className={styles.icon} />,
  dark: <Dark className={styles.icon} />,
  fairy: <Fairy className={styles.icon} />,
};
