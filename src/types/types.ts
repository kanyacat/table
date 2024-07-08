import { SetStateAction } from "react";
import { IPokemonData } from "./pokemonTypes";

export enum Property {
  ID = "id",
  NAME = "name",
  TYPES = "types",
  HEIGHT = "height",
  WEIGHT = "weight",
}

export interface IResPokemon {
  body: IPokemonData;
}

export interface IResPokemonsName {
  body: {
    results: IPokemonData[];
  };
}

export interface IHeader {
  name: string;
  sort?: SetStateAction<IPokemonData[]>;
}
