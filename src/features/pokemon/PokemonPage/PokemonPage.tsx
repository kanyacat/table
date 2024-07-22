import styles from "./PokemonPage.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//@ts-ignore
import ReturnIcon from "../../../assets/return.svg?react";
import { IPokemonData } from "../../../types/pokemonTypes";
import { getPokemon } from "../../../api/api";
import { Loader } from "../../../components/Loader/Loader";
import { PokemonType } from "../../../components/PokemonType/PokemonType";

export const PokemonPage = () => {
  const { id } = useParams();

  const [data, setData] = useState<IPokemonData>();

  const navigate = useNavigate();

  console.log(data);

  useEffect(() => {
    async function fetchData(id: string) {
      if (id) {
        const pokemonData = await getPokemon(id);
        setData(pokemonData);
      }
    }

    if (id) {
      fetchData(id);
    }
  }, [id]);

  if (!data) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <main className={styles.root}>
      <div className={data?.types[0].type.name}>
        <h1 className={styles.name}>{data?.name}</h1>
        <div className={styles.top}>
          <section className={styles.left}>
            <article className={styles.stats}>
              <div className={styles.types}>
                {data?.types.map((t) => {
                  return <PokemonType key={t.type.url} type={t.type.name} />;
                })}
              </div>
              <h2 className={styles.base__stats}>Base stats</h2>
              <ul>
                {data?.stats.map((st) => {
                  return (
                    <li key={st.stat.url}>
                      <p className={styles.stat__title}>
                        <span>{st.stat.name}</span>
                        <span className={styles.stat}>{st.base_stat}</span>
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
            </article>
            <button onClick={() => navigate(`/table/`)} className={styles.btn}>
              <ReturnIcon className={styles.arrow} /> Назад
            </button>
          </section>
          <section className={styles.sprites}>
            <img
              className={styles.sprite}
              src={data?.sprites.other?.["official-artwork"].front_default}
              alt="official-artwork"
            />
            <div className={styles.mini_sprites}>
              <img src={data?.sprites.front_default} alt="front_default" />
              <img src={data?.sprites.back_default} alt="back_default" />
              <img src={data?.sprites.front_shiny} alt="front_shiny" />
              <img src={data?.sprites.back_shiny} alt="back_shiny" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};