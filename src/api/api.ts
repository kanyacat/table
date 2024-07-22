import superagent from "superagent";
import { IResPokemonsName } from "../types/types";
import { API_URL } from "../consts";

export const requestPokemonData = async (offset: number, limit: number) => {
  try {
    const res: IResPokemonsName = await superagent.get(
      `${API_URL}?offset=${offset}&limit=${limit}`
    );

    const promises = [];

    for (let i = 0; i < limit; i++) {
      promises.push(superagent.get(`${API_URL}/${res.body.results[i].name}`));
    }

    const responses = await Promise.all(promises);

    const pokemonsArray = responses.map((resp) => resp.body);

    return pokemonsArray;
  } catch (err) {
    console.error(err);
  }
};
export const getPokemon = async (id: string) => {
  const pok = await superagent.get(`${API_URL}/${id}`);
  return pok.body;
};
