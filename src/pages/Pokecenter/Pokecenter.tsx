import styles from "./Pokecenter.module.css";
import not__pokemon from "../../assets/psydack.png";
import { Card } from "../../components/Card/Card";
import { ICustomPokemon } from "../../types/types";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const Pokecenter = () => {
  const pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");

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
                  type={pokemon.type}
                  description={pokemon.description}
                  picture={pokemon.picture}
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
              <p>Ещё не поступило ни одного покемона</p>
            </div>
          )}
        </article>
        <Link
          to="/table/pokecenter/create"
          className={clsx(styles.link, "button")}
        >
          +
        </Link>
      </main>
    </>
  );
};
