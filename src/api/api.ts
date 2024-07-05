import superagent from "superagent";
import { IResPokemonsName, IResPokemon } from "../types/types";
import { IPokemonData } from "../types/pokemonTypes";

let newArray: IPokemonData[] = [];
let pokemon: IPokemonData[] = [];

const pokemons = "https://pokeapi.co/api/v2/pokemon";

const limit = 15;

const pokemonsApi = async () => {
  try {
    const res: IResPokemonsName = await superagent.get(
      `${pokemons}?limit=${limit}`
    );

    newArray = [];

    for (let i = 0; i < limit; i++) {
      const resp: IResPokemon = await superagent.get(
        `${pokemons}/${res.body.results[i].name}`
      );

      const { id, name, weight, height } = resp.body;
      const types: string[] = [];

      resp.body.types.map((t) => types.push(t.type.name));

      newArray.push({
        id,
        weight,
        height,
        //@ts-ignore, позже поправлю
        types,
        name,
      });
    }
    return newArray;
  } catch (err) {
    console.error(err);
  }
};

export const resultPokemonsApi = async () => {
  await pokemonsApi();
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
