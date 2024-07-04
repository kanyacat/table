import { IUser, Property } from "../types/types";

export const sort = (table: IUser[], property: Property, dir: boolean) => {
  return table.slice().sort((a, b) => {
    const valueA =
      property === Property.FACT
        ? a.text
        : property === Property.VALUE
        ? Object.values(a.keyValue)[0]
        : Object.keys(a.keyValue)[0];

    const valueB =
      property === Property.FACT
        ? b.text
        : property === Property.VALUE
        ? Object.values(b.keyValue)[0]
        : Object.keys(b.keyValue)[0];

    if (typeof valueA === "string" && typeof valueB === "number") {
      return 1;
    } else if (typeof valueA === "number" && typeof valueB === "string") {
      return -1;
    } else {
      if (valueA < valueB) return dir ? -1 : 1;
      if (valueA > valueB) return dir ? 1 : -1;
    }

    return 0;
  });
};
