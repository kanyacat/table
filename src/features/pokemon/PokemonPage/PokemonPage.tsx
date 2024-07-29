import styles from "./PokemonPage.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//@ts-ignore
import ReturnIcon from "../../../assets/return.svg?react";
import { IPokemonData } from "../../../types/pokemonTypes";
import { getPokemon } from "../../../api/api";
import { Loader } from "../../../components/Loader/Loader";
import { PokemonType } from "../../../components/PokemonType/PokemonType";
import { IGetPokemonResponse } from "../../../types/types";
import { useTranslation } from "react-i18next";

export const PokemonPage = () => {
  const { t } = useTranslation("translation");

  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<IPokemonData>();

  const navigate = useNavigate();

  useEffect(() => {
    function fetchData(id: string) {
      setLoading(true);

      if (id) {
        getPokemon(id)
          .then((response?: IGetPokemonResponse) => {
            if (response) {
              setData(response.body);
            }
          })
          .catch((error) => {
            setLoading(false);
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }

    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className={styles.root}>
          <div
            className={data?.types[0].type.name ? data?.types[0].type.name : ""}
          >
            <h1 className={styles.name}>{data?.name}</h1>
            <div className={styles.top}>
              <section className={styles.left}>
                <article className={styles.stats}>
                  <div className={styles.types}>
                    {data?.types.map((t) => {
                      return (
                        <PokemonType key={t.type.url} type={t.type.name} />
                      );
                    })}
                  </div>
                  <h2 className={styles.base__stats}>{t("Base stats")}</h2>
                  <ul>
                    {data?.stats?.map((st) => {
                      return (
                        <li key={st.stat.url}>
                          <p className={styles.stat__title}>
                            <span>{t(`${st.stat.name}`)}</span>
                            <span className={styles.stat}>{st.base_stat}</span>
                          </p>
                        </li>
                      );
                    })}
                    <img
                      className={styles.showdown}
                      src={data?.sprites?.other?.showdown.front_default}
                      alt="showdown front"
                    />
                  </ul>
                </article>
                <button
                  onClick={() => navigate(`/table/`)}
                  className={styles.btn}
                >
                  <ReturnIcon className={styles.arrow} /> {t("Back")}
                </button>
              </section>
              <section className={styles.sprites}>
                <img
                  className={styles.sprite}
                  src={data?.sprites?.other?.["official-artwork"].front_default}
                  alt="official-artwork"
                />
                <div className={styles.mini_sprites}>
                  <img src={data?.sprites?.front_default} alt="front_default" />
                  <img src={data?.sprites?.back_default} alt="back_default" />
                  <img src={data?.sprites?.front_shiny} alt="front_shiny" />
                  <img src={data?.sprites?.back_shiny} alt="back_shiny" />
                </div>
              </section>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
