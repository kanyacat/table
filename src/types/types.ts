import { SetStateAction } from "react";
import { IPokemonData } from "./pokemonTypes";

export enum Property {
  ID = "id",
  NAME = "name",
  TYPES = "types",
  HEIGHT = "height",
  WEIGHT = "weight",
}

export interface IPokemon {
  name: string;
  id: string;
  weight: string;
  height: string;
  types: string[];
}

export interface IResPokemon {
  body: IPokemonData;
}

export interface IResPokemonsName {
  body: {
    results: IPokemon[];
  };
}

export interface IHeader {
  name: string;
  sort?: SetStateAction<IPokemon[]>;
}
