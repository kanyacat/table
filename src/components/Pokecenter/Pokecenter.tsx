import styles from "./Pokecenter.module.css";
import not__pokemon from "../../assets/psydack.png";
import { useState } from "react";
import { Editor } from "../Editor/Editor";
import { Card } from "../Card/Card";
import { ICustomPokemon } from "../../types/types";

export const Pokecenter = () => {
  const [isEditor, setIsEditor] = useState(false);

  const pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");

  return (
    <main className={styles.root}>
      {isEditor ? (
        <Editor closeEditor={() => setIsEditor(false)} />
      ) : (
        <>
          <article className={styles.pokemons}>
            {pokemons ? (
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
          <button className={styles.btn} onClick={() => setIsEditor(true)}>
            +
          </button>
        </>
      )}
    </main>
  );
};
