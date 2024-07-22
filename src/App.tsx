import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PATHS } from "./consts.ts";
import { PokemonList } from "./features/pokedex/PokemonList/PokemonList.tsx";
import { PokecenterPage } from "./features/pokecenter/PokecenterPage/PokecenterPage.tsx";
import { PokemonPage } from "./features/pokemon/PokemonPage/PokemonPage.tsx";
import { CreatePokemonPage } from "./features/pokecenter/createPokemon/CreatePokemonPage/CreatePokemonPage.tsx";

const router = createBrowserRouter([
  {
    path: PATHS.main,
    element: <PokemonList />,
  },
  {
    path: PATHS.pokemon,
    element: <PokemonPage />,
  },
  {
    path: PATHS.pokecenter,
    element: <PokecenterPage />,
  },
  {
    path: PATHS.create,
    element: <CreatePokemonPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
