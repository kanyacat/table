import superagent from "superagent";
import { IGetPokemonResponse, IResPokemonsName } from "../types/types";
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

    const responses: IGetPokemonResponse[] = await Promise.all(promises);

    return new Promise<IGetPokemonResponse[]>((resolve) => {
      resolve(responses);
    });
  } catch (err) {
    console.error(err);
  }
};
export const getPokemon = async (id: string) => {
  const pok: IGetPokemonResponse = await superagent.get(`${API_URL}/${id}`);

  return new Promise<IGetPokemonResponse>((resolve) => {
    resolve(pok);
  });
};
