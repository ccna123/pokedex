import React from "react";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import axios from "axios";
import { PokemonDetail } from "./PokemonDetail";

const TYPES_COLOR = {
  water: "bg-blue-600",
  fire: "bg-red-600",
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [filterPokemon, setFilterPokemon] = useState([]);
  const [filterType, setFilterType] = useState("");

  async function fetchPokemonDetail(pokemonData) {
    return Promise.all(
      pokemonData.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return res.data;
      })
    );
  }

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage - 1) * 20
          }`
        );
        const pokemonData = res.data.results;

        const pokemonDetail = await fetchPokemonDetail(pokemonData);
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

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setPokemon([res.data]);
      setFilterPokemon("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterType = async (e) => {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/type/${e.target.value}?limit=20&offset=${(currentPage - 1) * 20
      }`
    );
    const pokemonData = res.data.pokemon.map((pokemon) => pokemon.pokemon);
    const pokemonDetail = await fetchPokemonDetail(pokemonData);
    setPokemon(pokemonDetail);
    setFilterType(e.target.value);
  };
  return (
    <div className="App bg-slate-800 min-h-max w-full text-white font-mono">
      <header className="p-4 flex justify-center">
        <img src="/pokedex.png" alt="" />
      </header>

      <section
        className="flex justify-center items-center gap-4 mb-4"
        style={{ border: ["1px solid red"] }}
      >
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter pokemon name"
          className="p-2 rounded-md w-full md:w-[50%] text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-green-400 rounded-lg text-white hover:scale-105 duration-100 p-2"
        >
          Search
        </button>
      </section>

      <section
        className="w-full md:w-[50%] mx-auto flex justify-around my-6"
        style={{ border: ["1px solid red"] }}
      >
        <label htmlFor="type">Type</label>
        <select
          className="w-full ml-4 text-black"
          value={filterType}
          onChange={handleFilterType}
        >
          <option value="all">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="poison">Poison</option>
          <option value="grass">Grass</option>
          <option value="rock">Rock</option>
          <option value="ground">Ground</option>
          <option value="electric">Electric</option>
          <option value="steel">Steel</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="fairy">Fairy</option>
        </select>
      </section>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
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
          className={`${currentPage === 1
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
          types_color={TYPES_COLOR}
          onClose={() => setDisplayModal(false)}
        />
      )}
    </div>
  );
};
