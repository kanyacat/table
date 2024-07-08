import superagent from "superagent";
import { IResPokemonsName, IResPokemon } from "../types/types";
import { IPokemonData } from "../types/pokemonTypes";

let newArray: IPokemonData[] = [];
let pokemon: IPokemonData[] = [];

const pokemons = "https://pokeapi.co/api/v2/pokemon";

const pokemonsApi = async (offset: number, limit: number) => {
  try {
    const res: IResPokemonsName = await superagent.get(
      `${pokemons}?offset=${offset}&limit=${limit}`
    );

    newArray = [];

    for (let i = 0; i < limit; i++) {
      const resp: IResPokemon = await superagent.get(
        `${pokemons}/${res.body.results[i].name}`
      );

      const data = resp.body;

      newArray.push(data);
    }
    return newArray;
  } catch (err) {
    console.error(err);
  }
};

export const resultPokemonsApi = async (offset: number, limit: number) => {
  await pokemonsApi(offset, limit);
  return newArray;
};

const getPokemon = async (id: string) => {
  const res: IResPokemon = await superagent.get(`${pokemons}/${id}`);

  pokemon = [];

  pokemon.push(res.body);
};

export const resultGetPokemon = async (id: string) => {
  await getPokemon(id);

  return pokemon[0];
};
