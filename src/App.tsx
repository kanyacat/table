import "./App.css";
import { SortableTable } from "./components/SortableTable/SortableTable";
import { useCallback, useEffect, useState } from "react";
import { resultPokemonsApi } from "./api/api";
import { sort } from "./helpers/sort";
import { Property } from "./types/types";
import { IPokemonData } from "./types/pokemonTypes";
import Pagination from "./components/Pagination/Pagination";

const ROWS_PER_PAGE = 10;
const TOTAL_COUNT = 130;
const LIMIT = 10;

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);

function App() {
  const [arr, setArr] = useState<IPokemonData[]>([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const [dirName, setDirName] = useState<boolean>(true);
  const [dirId, setDirId] = useState<boolean>(true);
  const [dirTypes, setDirTypes] = useState<boolean>(true);
  const [dirWeight, setDirWeight] = useState<boolean>(true);
  const [dirHeight, setDirHeight] = useState<boolean>(true);

  const handleClick = (
    property: Property,
    dir: boolean,
    setDir: (dir: boolean) => void
  ) => {
    setDir(!dir);

    return sort(arr, property, dir);
  };

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

  useEffect(() => {
    async function fetchData() {
      const array = await resultPokemonsApi(offset, LIMIT);
      setArr(array);
    }

    fetchData();
  }, [page]);

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = arr ? getTotalPageCount(TOTAL_COUNT) : current;

    setOffset(offset + ROWS_PER_PAGE);

    setPage(next <= total ? next : current);
  }, [page, arr]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setOffset(offset - ROWS_PER_PAGE);

    setPage(prev > 0 ? prev : current);
  }, [page]);

  if (!arr) {
    return <div>loading...</div>;
  }

  return (
    <main className="root">
      <SortableTable rows={arr} header={headerConfig} />
      {arr && (
        <Pagination
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: page === 1,
            right: page === getTotalPageCount(TOTAL_COUNT),
          }}
          nav={{ current: page, total: getTotalPageCount(TOTAL_COUNT) }}
        />
      )}
    </main>
  );
}

export default App;
