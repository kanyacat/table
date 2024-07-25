import styles from "./PokecenterPage.module.css";
import not__pokemon from "../../../assets/psydack.png";
import { Card } from "../../../components/Card/Card";
import { ICustomPokemon } from "../../../types/types";
import { Header } from "../../../components/Header/Header";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const PokecenterPage = () => {
  const [pokemons, setPokemons] = useState<ICustomPokemon[]>([]);

  useEffect(() => {
    setPokemons(JSON.parse(localStorage.getItem("pokemons") || "[]"));
  }, []);

  return (
    <>
      <Header />
      <main className={styles.root}>
        <article className={styles.pokemons}>
          {pokemons.length ? (
            pokemons.map((pokemon: ICustomPokemon) => {
              return (
                <Card
                  className={styles.card}
                  name={pokemon.name}
                  key={pokemon.id}
                  id={pokemon.id}
                  types={pokemon.types}
                  description={pokemon.description}
                  picture={pokemon.picture}
                  setPokemons={setPokemons}
                />
              );
            })
          ) : (
            <div className={styles.not__pokemons}>
              <img
                className={styles.img}
                loading="lazy"
                src={not__pokemon}
                alt="not pokemon picture"
              />
              <p>No Pokemon have been received yet</p>
            </div>
          )}
        </article>
        <Link to="/table/pokecenter/create" className={clsx(styles.link)}>
          +
        </Link>
      </main>
    </>
  );
};
