import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../skeletons/Skeleton";

export const PokemonDetail = ({ id, onClose, types_color }) => {
  const [pokemon, setPokemon] = useState([]);
  const [strength, setStrength] = useState([]);
  const [weakness, setWeakness] = useState([]);

  async function fetchTypeDetail(typeData) {
    return Promise.all(
      typeData.map(async (type) => {
        const res = await axios.get(type.url);
        return res.data;
      })
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const typeData = res.data.types.map((type) => type.type);
      const typeDetail = await fetchTypeDetail(typeData);
      const damage_relations = typeDetail.map((type) => type.damage_relations);
      const newStrength = [];
      const newWeakness = [];
      damage_relations.forEach((damage) => {
        damage.double_damage_from.forEach((d) => newWeakness.push(d.name));
        damage.double_damage_to.forEach((d) => newStrength.push(d.name));
      });
      setStrength(newStrength);
      setWeakness(newWeakness);
      setPokemon(res.data);
    };

    const timeoutId = setTimeout(fetchData, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className="fixed top-0 left-0 justify-center items-center bg-black w-full flex h-full bg-opacity-30">
      <div className="bg-gradient-to-r from-lime-300 to-green-200 text-black rounded-lg w-full mx-4 lg:w-[50%] p-4 flex flex-col justify-center items-center">
        {pokemon.length === 0 ? (
          <Skeleton onClose={onClose} />
        ) : (
          <>
            <img
              src={pokemon.sprites?.front_default}
              className="w-52 h-56"
              alt="image"
            />

            <div className="w-full flex p-4 rounded-lg shadow-lg bg-slate-200">
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
                      className={`rounded-lg bg-green-400 h-full`}
                      style={{
                        width: [
                          `${
                            pokemon.stats &&
                            (pokemon.stats[n].base_stat / 255) * 100
                          }%`,
                        ],
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-100 rounded-lg shadow-lg w-full flex justify-around mt-8">
              <div className="p-4">
                <h1 className="mb-4 text-center text-4xl">Strength</h1>
                <div className="grid grid-cols-3 gap-4">
                  {strength.map((s, index) => (
                    <p
                      key={index}
                      className={`${types_color[s]} flex justify-center items-center rounded-md px-4 py-2`}
                    >
                      {s}
                    </p>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h1 className="mb-4 text-center text-4xl">Weakness</h1>
                <div className="grid grid-cols-3 gap-4">
                  {weakness.map((s, index) => (
                    <p
                      key={index}
                      className={`${types_color[s]} flex justify-center items-center rounded-md px-4 py-2`}
                    >
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="my-8 bg-amber-400 rounded-full hover:scale-105 duration-100 px-4 py-2"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};
