import { SetStateAction } from "react";
import { IPokemonData } from "./pokemonTypes";

export enum Property {
  ID = "id",
  NAME = "name",
  TYPES = "types",
  HEIGHT = "height",
  WEIGHT = "weight",
}

// export type pokemonTypes =
//   | "fire"
//   | "normal"
//   | "fighting"
//   | "flying"
//   | "ground"
//   | "poison"
//   | "rock"
//   | "bug"
//   | "ghost"
//   | "steel"
//   | "water"
//   | "grass"
//   | "electric"
//   | "phisic"
//   | "ice"
//   | "dragon"
//   | "dark"
//   | "fairy";

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
