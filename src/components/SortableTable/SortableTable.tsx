import { FC, useEffect, useState } from "react";
import styles from "./SortableTable.module.css";
//@ts-ignore
import { ReactComponent as DndIcon } from "../../assets/dnd.svg";
import { IHeader, IPokemon } from "../../types/types";
import { Link, redirect, useNavigate } from "react-router-dom";

export interface IProps {
  rows: IPokemon[];
  header: IHeader[];
}

export const SortableTable: FC<IProps> = ({ rows, header }) => {
  const [table, setTable] = useState<IPokemon[]>(rows);

  const [currentRow, setCurrentRow] = useState<IPokemon>();

  const navigate = useNavigate();

  useEffect(() => setTable(rows), [rows]);

  const dragStartHandler = (row: IPokemon) => {
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

  const dropHandler = (e: React.DragEvent, row: IPokemon) => {
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
                {h.sort && (
                  <button
                    onClick={() => {
                      if (h.sort) {
                        setTable(h.sort);
                      }
                    }}
                  >
                    ↕
                  </button>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {table?.map((r, index) => {
          return (
            <tr key={index} onClick={() => navigate(`/table/pokemon/${r.id}`)}>
              <td
                className={styles.grab}
                draggable={true}
                onDragStart={() => dragStartHandler(r)}
                onDragLeave={dragEndHandler}
                onDragEnd={dragEndHandler}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, r)}
              >
                <DndIcon />
              </td>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.types.join(", ")}</td>
              <td>{r.weight}</td>
              <td>{r.height}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
