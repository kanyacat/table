/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, SetStateAction } from "react";
import { IPokemonData, Sprites } from "./pokemonTypes";

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
  sort?: SetStateAction<any[]>;
}

export interface IPaginationProps {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  hasPage: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
  className?: string;
}

// export type ITableRows<T> = Partial<T>[];

export interface IColumn {
  field: string;
  // value: any;
}

export interface ISortableTableProps {
  rows: any[];
  columns: IColumn[];
  header: IHeader[];
}

export interface ICustomPokemon {
  name: string;
  id: string;
  types: IOptions[];
  description: string;
  picture: string;
}

export interface IOptions {
  name: string;
  icon: ReactNode;
}

export interface IError {
  type: string;
  id: string;
  name: string;
  file: string;
}

export interface IGetPokemonResponseBody {
  id: string;
  name: string;
  types: JSX.Element[];
  weight: string;
  height: string;
  sprites?: Sprites;
}

export interface IGetPokemonResponse {
  body: IGetPokemonResponseBody;
}
