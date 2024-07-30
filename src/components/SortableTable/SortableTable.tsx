/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import styles from "./SortableTable.module.css";
//@ts-ignore
import DndIcon from "../../assets/dnd2.svg?react";
import { IColumn, ISortableTableProps } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { IPokemonData } from "../../types/pokemonTypes";

export const SortableTable: FC<ISortableTableProps> = ({
  rows,
  header,
  columns,
}) => {
  const [table, setTable] = useState<IColumn[]>(rows);
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

  const droppableRow = (e: React.DragEvent, row: IPokemonData) => {
    e.preventDefault();

    if (currentRow !== undefined) {
      setTable(
        table.map((r: any) => {
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
          {header.map((header) => {
            return (
              <th key={header.name} className={styles.header}>
                {header.name}
                {header.sort && (
                  <button
                    className={styles.btn}
                    onClick={() => {
                      if (header.sort) {
                        setTable(header.sort);
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
        {table.map((row: any) => (
          <tr
            key={row.id}
            onClick={
              row.id.length === 9
                ? () => {}
                : () => navigate(`/table/pokemon/${row.id}`)
            }
          >
            <td
              className={styles.grab}
              draggable={true}
              onDragStart={() => dragStartHandler(row)}
              onDragLeave={dragEndHandler}
              onDragEnd={dragEndHandler}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => droppableRow(e, row)}
            >
              <DndIcon />
            </td>
            {columns.map((column) => (
              <td className={styles.name} key={row[column.field]}>
                {row[column.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
