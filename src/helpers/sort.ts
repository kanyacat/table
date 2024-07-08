import { IPokemonData } from "../types/pokemonTypes";
import { Property } from "../types/types";

export const sort = (
  table: IPokemonData[],
  property: Property,
  dir: boolean
) => {
  return table.slice().sort((a, b) => {
    let valueA = "";
    let valueB = "";

    switch (property) {
      case Property.ID:
        valueA = a.id;
        valueB = b.id;
        break;

      case Property.NAME:
        valueA = a.name;
        valueB = b.name;
        break;

      case Property.TYPES:
        valueA = a.types;
        valueB = b.types;
        break;

      case Property.WEIGHT:
        valueA = a.weight;
        valueB = b.weight;
        break;

      case Property.HEIGHT:
        valueA = a.height;
        valueB = b.height;
        break;

      default:
        break;
    }

    if (valueA < valueB) return dir ? -1 : 1;
    if (valueA > valueB) return dir ? 1 : -1;

    return 0;
  });
};
