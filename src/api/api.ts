import superagent from "superagent";
import { IResPokemonsName } from "../types/types";
import { IPokemonData } from "../types/pokemonTypes";

const pokemons = "https://pokeapi.co/api/v2/pokemon";

const pokemonsApi = async (
  pokemonsArray: IPokemonData[],
  offset: number,
  limit: number
) => {
  try {
    const res: IResPokemonsName = await superagent.get(
      `${pokemons}?offset=${offset}&limit=${limit}`
    );

    for (let i = 0; i < limit; i++) {
      await superagent
        .get(`${pokemons}/${res.body.results[i].name}`)
        .then((resp) => pokemonsArray.push(resp.body));
    }

    return pokemonsArray;
  } catch (err) {
    console.error(err);
  }
};

export const resultPokemonsApi = async (offset: number, limit: number) => {
  const pokemonsArray: IPokemonData[] = [];

  await pokemonsApi(pokemonsArray, offset, limit);
  return pokemonsArray;
};

export const getPokemon = async (id: string) => {
  const pok = await superagent.get(`${pokemons}/${id}`);
  return pok.body;
};
