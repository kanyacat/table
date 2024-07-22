import { useCallback, useEffect, useState } from "react";
import { IPokemonData, Type } from "../../../../types/pokemonTypes";
import "../../../../PokemonTypes.css";
import { Property } from "../../../../types/types";
import { requestPokemonData } from "../../../../api/api";
import { sort } from "../../../../helpers/sort";
import { Loader } from "../../../../components/Loader/Loader";
import { SortableTable } from "../../../../components/SortableTable/SortableTable";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { PokemonType } from "../../../../components/PokemonType/PokemonType";
import { columns } from "../../../../configs/tableColumnConfig";
import styles from "./PokedexTable.module.css";
import { LIMIT, ROWS_PER_PAGE, TOTAL_COUNT } from "../../../../consts";

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);
export const Table = () => {
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

      await requestPokemonData(offset, LIMIT)
        .then((response) => {
          setTableRows(
            //@ts-ignore
            response.map((pokemon) => ({
              id: pokemon.id,
              name: pokemon.name,
              types: pokemon.types.map((type: Type) => (
                <PokemonType key={type.type.url} type={type.type.name} />
              )),
              weight: pokemon.weight,
              height: pokemon.height,
            }))
          );
        })

        .catch((error) => {
          setLoading(false);
          console.error(error);
        })

        .finally(() => {
          setLoading(false);
        });
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