import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../skeletons/Skeleton";

export const PokemonDetail = ({ id, onClose }) => {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    setTimeout(async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(res.data);
    }, 2000);
  }, []);
  return (
    <div className="fixed top-0 left-0 justify-center items-center bg-black w-full flex h-full bg-opacity-30">
      <div className="bg-white text-black rounded-lg w-full mx-4 md:w-[50%] p-4 flex flex-col justify-center items-center">
        {pokemon.length === 0 ? (
          <Skeleton onClose={onClose} />
        ) : (
          <>
            <img
              src={pokemon.sprites?.front_default}
              className="w-52 h-52"
              alt="image"
            />

            <div className="w-full flex p-4">
              <div className="mr-4 flex flex-col gap-4">
                {pokemon.stats &&
                  pokemon.stats.map((stat, index) => (
                    <p key={index}>{stat.stat.name}</p>
                  ))}
              </div>
              <div className="w-[70%] flex flex-col gap-4">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="relative rounded-full bg-gray-500 h-6"
                  >
                    <p className="absolute left-[50%]">
                      {pokemon.stats && pokemon.stats[n].base_stat}
                    </p>
                    <div
                      className={`rounded-lg bg-red-400 h-full`}
                      style={{
                        width: [
                          `${pokemon.stats && pokemon.stats[n].base_stat}%`,
                        ],
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-4 bg-amber-400 rounded-full hover:scale-105 duration-100 px-4 py-2"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};
