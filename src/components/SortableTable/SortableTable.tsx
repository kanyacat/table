import { FC, useEffect, useState } from "react";
import styles from "./SortableTable.module.css";
//@ts-ignore
import { ReactComponent as DndIcon } from "../../assets/dnd.svg";
import { IHeader, IUser } from "../../types/types";

export interface IProps {
  rows: IUser[];
  header: IHeader[];
}

export const SortableTable: FC<IProps> = ({ rows, header }) => {
  const [table, setTable] = useState<IUser[]>(rows);

  const [currentRow, setCurrentRow] = useState<IUser>();

  useEffect(() => setTable(rows), [rows]);

  const dragStartHandler = (e: React.DragEvent, row: IUser) => {
    setCurrentRow(row);
  };

  const dragEndHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragged");
  };

  const dragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("dragged");
  };

  const dropHandler = (e: React.DragEvent, row: IUser) => {
    e.preventDefault();

    if (currentRow !== undefined) {
      setTable(
        table.map((r) => {
          if (r === currentRow) {
            return row;
          } else if (r === row) {
            return currentRow;
          }
          return r;
        })
      );
    }

    e.currentTarget.classList.remove("dragged");
  };

  return (
    <table className={styles.root}>
      <thead>
        <tr>
          {header.map((h) => {
            return (
              <th key={h.name} className={styles.header}>
                {h.name}
                {h.sort && <button onClick={() => setTable(h.sort)}>↕</button>}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {table?.map((r, index) => {
          return (
            <tr key={index}>
              <td
                className={styles.grab}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, r)}
                onDragLeave={dragEndHandler}
                onDragEnd={dragEndHandler}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, r)}
              >
                <DndIcon />
              </td>
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
