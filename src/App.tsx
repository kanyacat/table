import "./App.css";
import { SortableTable } from "./components/SortableTable/SortableTable";
import { useEffect, useState } from "react";
import { resultFactsApi } from "./api/api";
import { sort } from "./helpers/sort";
import { IUser, Property } from "./types/types";

function App() {
  const [arr, setArr] = useState<IUser[]>([]);

  const [dirName, setDirName] = useState<boolean>(true);
  const [dirValue, setDirValue] = useState<boolean>(true);
  const [dirFact, setDirFact] = useState<boolean>(true);

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
      name: "Name",
      sort: () => handleClick(Property.NAME, dirName, setDirName),
    },
    {
      name: "Value",
      sort: () => handleClick(Property.VALUE, dirValue, setDirValue),
    },
    {
      name: "Cat fact",
      sort: () => handleClick(Property.FACT, dirFact, setDirFact),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const array = await resultFactsApi();
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
