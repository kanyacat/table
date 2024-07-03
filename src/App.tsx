import superagent from "superagent";
import "./App.css";
import { SortableTable } from "./components/SortableTable/SortableTable";
import { useEffect, useState } from "react";

const array: Record<string, string | number>[] = [
  { rabbit: 7 },
  { cat: 11 },
  { dog: 19 },
  { kitten: "meow" },
  { kvakvakvakva: "kvakvakvakva" },
];

export interface IUser {
  id: string;
  text: string;
  keyValue: Record<string, string | number>;
}

interface IRes {
  body: [
    {
      _id: string;
      text: string;
    }
  ];
}

function App() {
  const [arr, setArr] = useState<IUser[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res: IRes = await superagent.get(
          "https://cat-fact.herokuapp.com/facts"
        );

        const newArray: IUser[] = [];

        array.map(
          (a: Record<string, string | number>, index: number): number => {
            return newArray.push({
              id: res.body[index]._id,
              text: res.body[index].text,
              keyValue: a,
            });
          }
        );

        setArr(newArray);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="root">
      <SortableTable rows={arr} />
    </div>
  );
}

export default App;
