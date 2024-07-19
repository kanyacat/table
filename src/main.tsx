import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pokemon } from "./components/Pokemon/Pokemon.tsx";
import { Pokecenter } from "./pages/Pokecenter/Pokecenter.tsx";
import { CreatePokemon } from "./pages/CreatePokemon/CreatePokemon.tsx";
const router = createBrowserRouter([
  {
    path: "/table/",
    element: <App />,
  },
  {
    path: "/table/pokemon/:id",
    element: <Pokemon />,
  },
  {
    path: "/table/pokecenter",
    element: <Pokecenter />,
  },
  {
    path: "/table/pokecenter/create",
    element: <CreatePokemon />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
