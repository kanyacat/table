import { FC, useEffect, useState } from "react";
import styles from "./SortableTable.module.css";
//@ts-ignore
import DndIcon from "../../assets/dnd.svg?react";
import { IHeader } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { IPokemonData } from "../../types/pokemonTypes";

export interface IProps {
  rows: IPokemonData[];
  header: IHeader[];
}

export const SortableTable: FC<IProps> = ({ rows, header }) => {
  const [table, setTable] = useState<IPokemonData[]>(rows);

  const [currentRow, setCurrentRow] = useState<IPokemonData>();

  const navigate = useNavigate();

  useEffect(() => setTable(rows), [rows]);

  const dragStartHandler = (row: IPokemonData) => {
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

  const dropHandler = (e: React.DragEvent, row: IPokemonData) => {
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
                    className={styles.btn}
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
