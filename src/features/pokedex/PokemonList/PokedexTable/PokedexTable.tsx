import { useCallback, useEffect, useState } from "react";
import { IPokemonData } from "../../../../types/pokemonTypes";
import "../../../../PokemonTypes.css";
import {
  Property,
  IGetPokemonResponse,
  ICustomPokemon,
} from "../../../../types/types";
import { requestPokemonData } from "../../../../api/api";
import { sort } from "../../../../helpers/sort";
import { Loader } from "../../../../components/Loader/Loader";
import { SortableTable } from "../../../../components/SortableTable/SortableTable";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { PokemonType } from "../../../../components/PokemonType/PokemonType";
import { columns } from "../../../../configs/tableColumnConfig";
import styles from "./PokedexTable.module.css";
import { ROWS_PER_PAGE, TOTAL_COUNT } from "../../../../consts";
import { useTranslation } from "react-i18next";

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);

export const Table = () => {
  const { t } = useTranslation();

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
    function fetchData() {
      setLoading(true);
      let limit = 10;

      const userData = JSON.parse(localStorage.getItem("pokemons") || "");

      const userArray: [] = userData.map((data: ICustomPokemon) => {
        return {
          id: data.id,
          name: data.name,
          types: data.types?.map((type) => (
            <PokemonType key={type.name} type={type.name.toLocaleLowerCase()} />
          )),
          weight: 100,
          height: 100,
        };
      });

      //всегда начинаем с 0
      if (page === 1 || (page == 2 && userArray.length >= 10)) {
        setOffset(0);
      }

      if (userArray.length > 0 && page == 1) {
        limit = 10 - userArray.length;
      }

      if (userArray.length < 10 && page == 2) {
        setOffset(10 - userArray.length);
      }

      requestPokemonData(offset, limit)
        .then((response?: IGetPokemonResponse[]) => {
          if (response) {
            const array = response.map((_, i) => ({
              id: response[i].body.id,
              name: response[i].body.name,
              types: response[i].body.types?.map((type) => (
                <PokemonType key={type.type.url} type={type.type.name} />
              )),
              weight: response[i].body.weight,
              height: response[i].body.height,
            }));

            if (page === 1) {
              setTableRows([...userArray, ...array]);
            } else {
              setTableRows(array);
            }
          }
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
      name: "",
    },
    {
      name: "ID",
      sort: () => handleClick(Property.ID, dirId, setDirId),
    },
    {
      name: `${t("Name")}`,
      sort: () => handleClick(Property.NAME, dirName, setDirName),
    },
    {
      name: `${t("Types")}`,
      sort: () => handleClick(Property.TYPES, dirTypes, setDirTypes),
    },
    {
      name: `${t("Weight")}`,
      sort: () => handleClick(Property.WEIGHT, dirWeight, setDirWeight),
    },
    {
      name: `${t("Height")}`,
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

  if (loading) {
    return (
      <main className={styles.root}>
        <Loader />
      </main>
    );
  }

  return (
    <main className={styles.root}>
      <SortableTable rows={tableRows} columns={columns} header={headerConfig} />
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
    </main>
  );
};
