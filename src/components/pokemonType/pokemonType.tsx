// @ts-nocheck
//он ругается на импорты, но с ними всё ок
import { ReactNode } from "react";
import Fire from "../../assets/pokemonTypes/Type=Fire.svg?react";
import Normal from "../../assets/pokemonTypes/Type=Normal.svg?react";
import Fighting from "../../assets/pokemonTypes/Type=Fighting.svg?react";
import Flying from "../../assets/pokemonTypes/Type=Flying.svg?react";
import Ground from "../../assets/pokemonTypes/Type=Ground.svg?react";
import Poison from "../../assets/pokemonTypes/Type=Poison.svg?react";
import Rock from "../../assets/pokemonTypes/Type=Rock.svg?react";
import Bug from "../../assets/pokemonTypes/Type=Bug.svg?react";
import Ghost from "../../assets/pokemonTypes/Type=Ghost.svg?react";
import Steel from "../../assets/pokemonTypes/Type=Steel.svg?react";
import Water from "../../assets/pokemonTypes/Type=Water.svg?react";
import Grass from "../../assets/pokemonTypes/Type=Grass.svg?react";
import Electric from "../../assets/pokemonTypes/Type=Electric.svg?react";
import Psychic from "../../assets/pokemonTypes/Type=Psychic.svg?react";
import Ice from "../../assets/pokemonTypes/Type=Ice.svg?react";
import Dragon from "../../assets/pokemonTypes/Type=Dragon.svg?react";
import Dark from "../../assets/pokemonTypes/Type=Dark.svg?react";
import Fairy from "../../assets/pokemonTypes/Type=Fairy.svg?react";

export const pokemonType: Record<string, ReactNode> = {
  fire: <Fire />,
  normal: <Normal />,
  fighting: <Fighting />,
  flying: <Flying />,
  ground: <Ground />,
  poison: <Poison />,
  rock: <Rock />,
  bug: <Bug />,
  ghost: <Ghost />,
  steel: <Steel />,
  water: <Water />,
  grass: <Grass />,
  electric: <Electric />,
  phisic: <Psychic />,
  ice: <Ice />,
  dragon: <Dragon />,
  dark: <Dark />,
  fairy: <Fairy />,
};
