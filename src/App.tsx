import "./App.css";
import { SortableTable } from "./components/SortableTable/SortableTable";
import { useEffect, useState } from "react";
import { resultPokemonsApi } from "./api/api";
import { sort } from "./helpers/sort";
import { IPokemon, Property } from "./types/types";

function App() {
  const [arr, setArr] = useState<IPokemon[]>([]);

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
      const array = await resultPokemonsApi();
      setArr(array);
    }

    fetchData();
  }, []);

  return (
    <div className="root">
      <SortableTable rows={arr} header={headerConfig} />
    </div>
  );
}

export default App;
