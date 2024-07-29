import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PATHS } from "./consts.ts";
import { PokemonList } from "./features/pokedex/PokemonList/PokemonList.tsx";
import { PokecenterPage } from "./features/pokecenter/PokecenterPage/PokecenterPage.tsx";
import { PokemonPage } from "./features/pokemon/PokemonPage/PokemonPage.tsx";
import { CreatePokemonPage } from "./features/pokecenter/createPokemon/CreatePokemonPage/CreatePokemonPage.tsx";
import { I18nextProvider, useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </>
  );
}

export default App;
