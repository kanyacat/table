import { FC, useEffect, useState } from "react";
import styles from "./SortableTable.module.css";
import { IUser } from "../../App";

interface IProps {
  rows: IUser[];
}

enum Property {
  ID = "id",
  NAME = "name",
  VALUE = "value",
  FACT = "fact",
}

export const SortableTable: FC<IProps> = ({ rows }) => {
  const [table, setTable] = useState(rows);

  const [dirId, setDirId] = useState(true);
  const [dirName, setDirName] = useState(true);
  const [dirValue, setDirValue] = useState(true);
  const [dirFact, setDirFact] = useState(true);

  useEffect(() => setTable(rows), [rows]);

  const sort = (property: Property, dir: boolean) => {
    setTable(
      table.slice().sort((a, b) => {
        const valueA =
          property === Property.ID || property === Property.FACT
            ? property === Property.ID
              ? a.id
              : a.text
            : property === Property.VALUE
            ? Object.values(a.keyValue)[0]
            : Object.keys(a.keyValue)[0];

        const valueB =
          property === Property.ID || property === Property.FACT
            ? property === Property.ID
              ? b.id
              : b.text
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
      })
    );
  };

  const handleClick = (
    property: Property,
    dir: boolean,
    setDir: (dir: boolean) => void
  ) => {
    sort(property, dir);
    setDir(!dir);
  };

  return (
    <table border={1} className={styles.root}>
      <tbody>
        <tr>
          <th>
            Id
            <button onClick={() => handleClick(Property.ID, dirId, setDirId)}>
              ↕
            </button>
          </th>
          <th>
            Name
            <button
              onClick={() => handleClick(Property.NAME, dirName, setDirName)}
            >
              ↕
            </button>
          </th>
          <th>
            Value
            <button
              onClick={() => handleClick(Property.VALUE, dirValue, setDirValue)}
            >
              ↕
            </button>
          </th>

          <th>
            Fact
            <button
              onClick={() => handleClick(Property.FACT, dirFact, setDirFact)}
            >
              ↕
            </button>
          </th>
        </tr>
        {table?.map((r, index) => {
          return (
            <tr key={index}>
              <td>{Object.values(r.id)}</td>
              <td>{Object.keys(r.keyValue)}</td>
              <td>{Object.values(r.keyValue)}</td>
              <td>{Object.values(r.text)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
