import styles from "./Pokemon.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resultGetPokemon } from "../../api/api";
import { IPokemonData } from "../../types/pokemonTypes";
import { pokemonType } from "../pokemonType/pokemonType";

export const Pokemon = () => {
  const { id } = useParams();

  const [data, setData] = useState<IPokemonData>();

  useEffect(() => {
    async function fetchData(id: string) {
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
    <main className={styles.root}>
      <div className={data?.types[0].type.name}>
        <h1 className={styles.name}>{data?.name}</h1>
        <div className={styles.top}>
          <section className={styles.stats}>
            <div>
              {data?.types.map((t) => {
                if (t.type.name in pokemonType) {
                  return (
                    <span className={styles.type}>
                      {pokemonType[t.type.name]}
                    </span>
                  );
                }
              })}
            </div>
            <h2 className={styles.base_stats}>Base stats:</h2>
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
              <img
                className={styles.showdown}
                src={data?.sprites.other?.showdown.front_default}
                alt="showdown front"
              />
            </ul>
          </section>
          <div className={styles.sprites}>
            <img
              className={styles.sprite}
              src={data?.sprites.other?.["official-artwork"].front_default}
              alt=""
            />
            <div className={styles.mini_sprites}>
              <img src={data?.sprites.front_default} alt="front_default" />
              <img src={data?.sprites.back_default} alt="back_default" />
              <img src={data?.sprites.front_shiny} alt="front_shiny" />
              <img src={data?.sprites.back_shiny} alt="back_shiny" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
