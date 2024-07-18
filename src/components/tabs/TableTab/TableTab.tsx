import { useCallback, useEffect, useState } from "react";
import { IPokemonData } from "../../../types/pokemonTypes";
import "../../../PokemonTypes.css";
import { Property } from "../../../types/types";
import { resultPokemonsApi } from "../../../api/api";
import { sort } from "../../../helpers/sort";
import { Loader } from "../../Loader/Loader";
import { SortableTable } from "../../SortableTable/SortableTable";
import { Pagination } from "../../Pagination/Pagination";
import { PokemonType } from "../../PokemonType/PokemonType";
import { columns } from "../../../configs/tableColumnConfig";
import styles from "./TableTab.module.css";

const ROWS_PER_PAGE = 10;
const TOTAL_COUNT = 130;
const LIMIT = 10;

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);
export const TableTab = () => {
  const [tableRows, setTableRows] = useState<IPokemonData[]>([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const [dirName, setDirName] = useState<boolean>(true);
  const [dirId, setDirId] = useState<boolean>(true);
  const [dirTypes, setDirTypes] = useState<boolean>(true);
  const [dirWeight, setDirWeight] = useState<boolean>(true);
  const [dirHeight, setDirHeight] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const array = await resultPokemonsApi(offset, LIMIT);

      setTableRows(
        //@ts-ignore
        array.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map((t) => (
            <PokemonType key={t.type.url} type={t.type.name} />
          )),
          weight: pokemon.weight,
          height: pokemon.height,
        }))
      );

      setLoading(false);
    }

    fetchData();
  }, [offset, page]);

  const headerConfig = [
    {
      name: "Move",
    },
    {
      name: "Id",
      sort: () => handleClick(Property.ID, dirId, setDirId),
    },
    {
      name: "Name",
      sort: () => handleClick(Property.NAME, dirName, setDirName),
    },
    {
      name: "Types",
      sort: () => handleClick(Property.TYPES, dirTypes, setDirTypes),
    },
    {
      name: "Weight",
      sort: () => handleClick(Property.WEIGHT, dirWeight, setDirWeight),
    },
    {
      name: "Height",
      sort: () => handleClick(Property.HEIGHT, dirHeight, setDirHeight),
    },
  ];

  const handleClick = (
    property: Property,
    dir: boolean,
    setDir: (dir: boolean) => void
  ) => {
    setDir(!dir);

    return sort(tableRows, property, dir);
  };

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = tableRows ? getTotalPageCount(TOTAL_COUNT) : current;

    setOffset(offset + ROWS_PER_PAGE);

    setPage(next <= total ? next : current);
  }, [page, tableRows, offset]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setOffset(offset - ROWS_PER_PAGE);

    setPage(prev > 0 ? prev : current);
  }, [offset, page]);

  return (
    <main className={styles.root}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SortableTable
            rows={tableRows}
            columns={columns}
            header={headerConfig}
          />
          {tableRows && (
            <Pagination
              onNextPageClick={handleNextPageClick}
              onPrevPageClick={handlePrevPageClick}
              hasPage={{
                hasPreviousPage: page === 1,
                hasNextPage: page === getTotalPageCount(TOTAL_COUNT),
              }}
              nav={{ current: page, total: getTotalPageCount(TOTAL_COUNT) }}
            />
          )}
        </>
      )}
    </main>
  );
};
