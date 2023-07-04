import React from "react";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import axios from "axios";
import { PokemonDetail } from "./PokemonDetail";

const TYPES_COLOR = {
  water: "bg-blue-600",
  fire: "bg-blue-600",
  bug: "bg-lime-400",
  poison: "bg-fuchsia-600",
  grass: "bg-green-600",
  flying: "bg-amber-200",
  normal: "bg-neutral-500",
  fairy: "bg-purple-400",
  ground: "bg-yellow-600",
  electric: "bg-yellow-400",
  fighting: "bg-slate-500",
  rock: "bg-stone-500",
  psychic: "bg-pink-600",
  ghost: "bg-indigo-600",
  ice: "bg-sky-500",
  steel: "bg-zinc-600",
  dragon: "bg-orange-500",
};

export const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${
            (currentPage - 1) * 20
          }`
        );
        const pokemonData = res.data.results;

        const pokemonDetail = await Promise.all(
          pokemonData.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );
        setPokemon(pokemonDetail);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonData();
  }, [currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleSelectPokemon = (id) => {
    setSelectedPokemon(id);
    setDisplayModal(true);
  };

  return (
    <div className="App bg-slate-800 min-h-max w-full text-white font-mono">
      <header className="p-4 text-center">Pokedex</header>
      <div
        className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4"
        style={{ border: ["1px solid red"] }}
      >
        {pokemon.map((p, index) => (
          <Card
            id={p.id}
            key={index}
            name={p.name}
            sprite={p.sprites.front_default}
            types={p.types}
            types_color={TYPES_COLOR}
            onClick={handleSelectPokemon}
          />
        ))}
      </div>
      <div className="text-center flex gap-5 justify-center py-5">
        <button
          disabled={currentPage === 1}
          onClick={handlePrev}
          className={`${
            currentPage === 1
              ? "bg-slate-400 text-white cursor-not-allowed"
              : "bg-white"
          }  text-black py-2 px-4 cursor-pointer hover:scale-105 duration-100 flex items-center rounded-md`}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-black py-2 px-4 cursor-pointer hover:scale-105 duration-100 flex items-center rounded-md"
        >
          Next
        </button>
      </div>
      {displayModal && (
        <PokemonDetail
          id={selectedPokemon}
          onClose={() => setDisplayModal(false)}
        />
      )}
    </div>
  );
};
