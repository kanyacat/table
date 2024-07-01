import "./App.css";
import { SortableTable } from "./components/SortableTable/SortableTable";

const array: Record<string, string | number>[] = [
  { rabbit: 7 },
  { cat: 23 },
  { dog: 19 },
  { kitten: 14 },
  { puppy: 8 },
  { meow: "meow" },
  { kva: "kva" },
];

function App() {
  return (
    <div className="root">
      <SortableTable rows={array} />
    </div>
  );
}

export default App;
