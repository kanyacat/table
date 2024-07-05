import styles from "./Pokemon.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resultGetPokemon } from "../../api/api";
import { IPokemonData } from "../../types/pokemonTypes";

export const Pokemon = () => {
  const { id } = useParams();

  const [data, setData] = useState<IPokemonData>();

  useEffect(() => {
    async function fetchData(id: string) {
      console.log("я фетчу", id);

      if (id) {
        const pokemonData = await resultGetPokemon(id);
        setData(pokemonData);
      }
    }

    if (id) {
      fetchData(id);
    }
  }, [id]);

  console.log(data);

  return (
    <div className={styles.root}>
      <h1>{data?.name}</h1>
      <div>
        <h2> Sprites:</h2>
        <div className={styles.base_sprite}>
          <h3>Base:</h3>
          <img src={data?.sprites.front_default} alt="front_default" />
          <img src={data?.sprites.back_default} alt="back_default" />
        </div>
        <div className={styles.shiny_sprite}>
          <h3>Shiny:</h3>
          <img src={data?.sprites.front_shiny} alt="front_shiny" />
          <img src={data?.sprites.back_shiny} alt="back_shiny" />
        </div>
        <h3>Base stats:</h3>
        <ul>
          {data?.stats.map((st) => {
            return (
              <li key={st.stat.url}>
                <p>
                  {st.stat.name}: <span>{st.base_stat}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
