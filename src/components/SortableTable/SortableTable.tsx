import { FC, useState } from "react";
import styles from "./SortableTable.module.css";

interface IProps {
  rows: Array<Record<string, string | number>>;
}

enum Property {
  KEY = "key",
  VALUE = "value",
}

export const SortableTable: FC<IProps> = ({ rows }) => {
  const [table, setTable] = useState(rows);

  const [dirKey, setDirKey] = useState(true);
  const [dirValue, setDirValue] = useState(true);

  const onClickKey = () => {
    sort(Property.KEY, dirKey);
    setDirKey(!dirKey);
  };

  const onClickValue = () => {
    sort(Property.VALUE, dirValue);
    setDirValue(!dirValue);
  };

  const sort = (property: Property, dir: boolean) => {
    setTable(
      table.slice().sort((a, b) => {
        const valueA =
          property === Property.KEY ? Object.keys(a)[0] : Object.values(a)[0];
        const valueB =
          property === Property.KEY ? Object.keys(b)[0] : Object.values(b)[0];

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

  return (
    <table border={1} className={styles.root}>
      <tbody>
        <tr>
          <th>
            key
            <button onClick={onClickKey}>↕</button>
          </th>
          <th>
            value
            <button onClick={onClickValue}>↕</button>
          </th>
        </tr>
        {table.map((r, index) => {
          return (
            <tr key={index}>
              <td>{Object.keys(r)}</td>
              <td>{Object.values(r)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
