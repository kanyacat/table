import { useState } from "react";
import { TableTab } from "./components/tabs/TableTab/TableTab";
import styles from "./App.module.css";
import { PokecenterTab } from "./components/tabs/PokecenterTab/PokecenterTab";

function App() {
  const [isPokecenter, setIsPokecenter] = useState(false);

  return (
    <>
      <div className={styles.btns}>
        <button onClick={() => setIsPokecenter(false)}>Pokemon list</button>
        <button onClick={() => setIsPokecenter(true)}>Pokecenter</button>
      </div>
      {isPokecenter ? <PokecenterTab /> : <TableTab />}
    </>
  );
}

export default App;
